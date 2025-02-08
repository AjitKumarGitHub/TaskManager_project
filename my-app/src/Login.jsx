import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext'; // Import useAuth

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/users/login`, {
        username,
        email,
        password: pwd,
      });
      console.log(res.data);

      const token = res.data.token; // Adjust based on your API response structure

      if (res.data.success) {
        Cookies.set('token', token, { expires: 1 }); // Set the token in cookies
        login(token); // Update authentication state
        console.log('Token stored:', token);
        navigate('/'); 
        toast.success(res.data.message);
        setUserName("");
        setEmail("");
        setPwd("");
      }
    } catch (error) {
      toast.error("Try again");
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
        <h1 className='text-3xl font-bold text-center mb-6'>Login</h1>
        <form onSubmit={handler}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-sm font-semibold mb-1'>User  Name</label>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder='User  Name'
              type='text'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-semibold mb-1'>Email</label>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              type='email'
              required
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-semibold mb-1'>Password</label>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder='Password'
              type='password'
              required
            />
          </div>

          <button type="submit" className='w-full bg-blue-500 text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
            Login
          </button>

          <div className='mt-4 text-center'>
            <p className='text-sm'>If not, <Link className='text-blue-500 font-semibold' to={'/signup'}>Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;