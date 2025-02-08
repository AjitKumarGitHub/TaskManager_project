import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);

  const updateUser = async () => {
    const token = Cookies.get('token');
    console.log(token);
    
    if (token) {
      const decoded = jwtDecode(token);
      const id = decoded.id;
      console.log(id);

      try {
        const res = await axios.put(`https://taskmanager-project-0iuh.onrender.com/api/users/updateUser/${id}`, { username, email, password }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No token found");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser();
    console.log('Settings saved:', { username, email, password, notifications });
  };

  return (
    <div className="max-w-lg md:mt-[10%] mt-[90%] md:w-[80%] w-full md:ml-[35%] p-6 border border-gray-300 rounded-lg shadow-lg absolute">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
