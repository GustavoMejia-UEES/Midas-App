import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminGuides = () => {
    const { currentUser } = useAuth();
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const guidesSnapshot = await getDocs(collection(db, 'guides'));
                const guidesData = guidesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setGuides(guidesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching guides:', error);
                setError('Failed to load guides');
                setLoading(false);
            }
        };

        fetchGuides();
    }, []);

    const handleDeleteGuide = async (guideId) => {
        if (window.confirm('Are you sure you want to delete this guide?')) {
            try {
                await deleteDoc(doc(db, 'guides', guideId));
                setGuides(guides.filter(guide => guide.id !== guideId));
            } catch (error) {
                console.error('Error deleting guide:', error);
                setError('Failed to delete guide');
            }
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Manage Guides</h1>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Manage Guides</h1>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Guides</h1>
                <Link
                    to="/admin/guides/create"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    Create New Guide
                </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {guides.map(guide => (
                            <tr key={guide.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {guide.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                        {guide.description}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/admin/guides/edit/${guide.id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteGuide(guide.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminGuides; 