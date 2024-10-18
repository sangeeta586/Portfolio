import React from 'react';

const users = [
  { name: 'Alice', status: 'offline', avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg' },
  { name: 'Bob', status: 'online', avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg' },
  // Add remaining users
];

const Sidebar = ({ onUserClick }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 ml-16">
      <header className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-12 p-2 bg-gray-700 text-white rounded focus:outline-none"
        />
      </header>
      <ul className="overflow-y-auto h-80">
        {users.map((user, index) => (
          <li key={index} className="flex items-center py-2 hover:bg-gray-700" onClick={() => onUserClick(user)}>
            <img src={user.avatar} alt="" className="rounded-full w-10 h-10 mr-3" />
            <div>
              <h2 className="text-sm">{user.name}</h2>
              <h3 className="text-xs">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${user.status === 'online' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                {user.status}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
