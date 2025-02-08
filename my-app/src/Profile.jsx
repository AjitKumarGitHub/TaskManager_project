import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  },[]);

  const getUser = async () => {
    const token = Cookies.get('token');
    if (token) {
       const decoded = jwtDecode(token);
       const userId = decoded.id;  
       
      try {
        const res = await axios.get(`https://taskmanager-project-0iuh.onrender.com/users/userData/${userId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
         
        
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

   

  if (!user) return <div>Loading...</div>;

  const avatar='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid';
  return (
    <div className="max-w-md mx-auto pt-5 bg-white shadow-lg rounded-lg overflow-hidden ml-1 md:mt-[10%] mt-[90%] md:w-[80%] w-[100%] md:ml-[50%] mx-2 absolute">
      {/* Avatar Section */}
      <div className="flex items-center justify-center p-4 bg-gray-200">
        <img
          src={avatar || 'https://via.placeholder.com/150'} 
          alt="Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
      </div>

      {/* User Information Section */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{user.firstname} {user.lastname}</h2>
        <p className="text-gray-600 text-2xl">{user.username}</p>
        <p className="text-gray-600 text-2xl">{user.email}</p>
        <p className="text-gray-600 text-2xl">Student</p>
        <p className="text-gray-600 text-2xl">NIT Srinagar</p>
        <p className="text-gray-600 text-2xl">Madhubani</p>
        <p className="text-gray-600 text-2xl">Bihar</p>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
