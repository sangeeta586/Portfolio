import React from 'react';

const ChatWindow = ({ selectedUser, messages, onCloseChat }) => {
  const userMessages = selectedUser ? messages.filter(msg => msg.email === selectedUser.email) : [];

  return (
    <main className="flex-1 bg-gray-100 p-4 ">
      {selectedUser ? (
        <>
          <header className="flex items-center mb-4">
            <img src={selectedUser.avatar} alt="" className="rounded-full w-12 h-12 mr-3" />
            <div>
              <h2 className="text-lg">Chat with {selectedUser.name}</h2>
              <h3 className="text-sm text-gray-500">{userMessages.length} messages</h3>
            </div>
            <button className="ml-auto text-gray-600" onClick={onCloseChat}>Close</button>
          </header>
          <ul className="overflow-y-auto h-80 border-t-2 border-b-2 border-white">
            {userMessages.map((message, index) => (
              <li key={index} className={`flex ${message.sender === 'me' ? 'justify-end' : ''} mb-2`}>
                <div className={`max-w-lg p-3 rounded-lg text-white ${message.sender === 'me' ? 'bg-blue-400' : 'bg-green-500'}`}>
                  <div className="flex justify-between mb-1">
                    <h2 className="text-sm">{message.sender === 'me' ? 'You' : selectedUser.name}</h2>
                    <h3 className="text-xs text-gray-300">{new Date(message.createdAt).toLocaleTimeString()}</h3>
                  </div>
                  <div>{message.message}</div>
                </div>
              </li>
            ))}
          </ul>
          <footer className="mt-4">
            <textarea
              placeholder="Type your message"
              className="w-full h-20 p-2 border rounded resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" className="h-8 cursor-pointer" />
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" className="h-8 cursor-pointer" />
              </div>
              <a href="#" className="text-blue-400 font-bold uppercase">Send</a>
            </div>
          </footer>
        </>
      ) : (
        <div className="text-center text-gray-500">Select a user to start chatting.</div>
      )}
    </main>
  );
};

export default ChatWindow;
