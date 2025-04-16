import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import defaultAvatar from "../../public/assets/default.jpg";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const SearchModal = ({ startChat }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSearchTerm("");
        setUsers([]);
        setError(null);
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setError("Por favor ingresa un término de búsqueda");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const normalizedSearchTerm = searchTerm.toLowerCase();
            const q = query(
                collection(db, "users"),
                where("username", ">=", normalizedSearchTerm),
                where("username", "<=", normalizedSearchTerm + "\uf8ff")
            );

            const querySnapshot = await getDocs(q);
            const foundUsers = [];

            querySnapshot.forEach((doc) => {
                foundUsers.push({ id: doc.id, ...doc.data() });
            });

            setUsers(foundUsers);

            if (foundUsers.length === 0) {
                setError("No se encontraron usuarios");
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setError("Error al buscar usuarios");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={openModal}
                className="p-2 rounded-lg text-muted-foreground hover:bg-secondary/50"
            >
                <FaSearch className="h-5 w-5" />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Buscar Usuarios</h2>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-lg text-muted-foreground hover:bg-secondary/50"
                            >
                                <FaXmark className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="relative mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nombre de usuario..."
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 top-2 p-1 rounded-lg text-muted-foreground hover:bg-secondary/50"
                            >
                                <RiSearchLine className="h-5 w-5" />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-2 rounded-lg bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="text-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center p-2 rounded-lg hover:bg-secondary/50 cursor-pointer"
                                        onClick={() => startChat(user)}
                                    >
                                        <img
                                            src={user.image || defaultAvatar}
                                            alt={user.username}
                                            className="h-10 w-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="font-medium">{user.username}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchModal;
