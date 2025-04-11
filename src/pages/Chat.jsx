import React, { useState, useEffect } from 'react';
import { 
  PaperAirplaneIcon,
  UserCircleIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { listenForMessages, sendMessage } from '../firebase/chat';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const chatId = 'default-chat'; // Esto debería venir de la URL o del estado global

  useEffect(() => {
    const unsubscribe = listenForMessages(chatId, setMessages);
    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && user) {
      try {
        await sendMessage(message, chatId, user.uid, 'bot');
        setMessage('');
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-card p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserCircleIcon className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Asistente MIDAS</h2>
            <p className="text-sm text-muted-foreground">En línea</p>
          </div>
        </div>
        <button className="p-2 hover:bg-background rounded-full">
          <EllipsisHorizontalIcon className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === user?.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === user?.uid
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp?.toDate().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat; 