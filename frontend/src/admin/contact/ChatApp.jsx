import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import axios from 'axios';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isChatVisible, setChatVisible] = useState(false); // New state for chat visibility

    const URI = import.meta.env.VITE_API_URL;

    React.useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${URI}/api/contactme/`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setChatVisible(true); // Show chat window on user click
    };

    const handleCloseChat = () => {
        setChatVisible(false); // Close chat window
    };

    return (
        <div className="flex h-screen w-full bg-blue-200">
            <Sidebar onUserClick={handleUserClick} />
            {/* Conditional rendering of ChatWindow based on screen size */}
            <div className={`flex-1 transition-all duration-300 ${isChatVisible ? 'block' : 'hidden md:block'}`}>
                <ChatWindow 
                    selectedUser={selectedUser} 
                    messages={messages} 
                    onCloseChat={handleCloseChat} // Pass close handler
                />
            </div>
            {/* On small screens, show a button to toggle chat window */}
            <button 
                className={`md:hidden p-2 bg-blue-500 text-white rounded fixed bottom-4 right-4 transition-opacity duration-300 ${isChatVisible ? 'opacity-0' : 'opacity-100'}`}
                onClick={() => setChatVisible(true)}
            >
                Open Chat
            </button>
        </div>
    );
};

export default ChatApp;
