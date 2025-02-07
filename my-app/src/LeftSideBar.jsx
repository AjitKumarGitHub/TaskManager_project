import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaTachometerAlt, FaUser, FaCheckCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const LeftSideBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const request = await axios.post(`http://localhost:5000/api/users/logout`);
      if (request.status === 200) {
        Cookies.remove('token');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLinkStyle = (isActive) => ({
    color: isActive ? "blue" : "white",
  });

  return (
    <div className='mt-0 h-auto md:h-screen bg-slate-400 w-full md:w-[16%]'>
      <div className='mt-5 pt-10 text-white font-bold text-2xl'>
        <ul className='flex flex-col'>
          <li className='py-3 ml-2 flex flex-row space-x-1'>
            <FaTachometerAlt />
            <NavLink style={({ isActive }) => getLinkStyle(isActive)} to={'/dashboard'}>Dashboard</NavLink>
          </li>
          <li className='py-3 ml-2 flex flex-row space-x-1'>
            <FaCheckCircle className="mr-2" />
            <NavLink style={({ isActive }) => getLinkStyle(isActive)} to={'/completed'}>Completed Task</NavLink>
          </li>
          <li className='py-3 ml-2 flex flex-row space-x-1'>
            <FaCog className="mr-2" />
            <NavLink style={({ isActive }) => getLinkStyle(isActive)} to={'/setting'}>Setting</NavLink>
          </li>
          <li className='py-3 ml-2 flex flex-row space-x-1'>
            <FaUser className="mr-2" />
            <NavLink style={({ isActive }) => getLinkStyle(isActive)} to={'/profile'}>Profile</NavLink>
          </li>
          <li className='py-3 ml-2 flex flex-row space-x-1'>
            <FaSignOutAlt className="mr-2" />
            <button onClick={handleLogout}>LogOut</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSideBar;
