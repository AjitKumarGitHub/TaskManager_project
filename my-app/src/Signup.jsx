import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/users/signup`, {
        firstname: fname,
        lastname: lName,
        username,
        email,
        password: pwd,
      });
      console.log(res);

      if (res) {
        toast.success(res.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error('Signup failed, please try again.');
    }

    console.log(lName, fname, username, email, pwd);
    
    setFname("");
    setLName("");
    setUserName("");
    setEmail("");
    setPwd("");
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
        <h1 className='text-3xl font-bold text-center mb-6'>Sign Up</h1>
        <form onSubmit={handler}>
          <div className='mb-4'>
            <label htmlFor='fname' className='block text-sm font-semibold mb-1'>First Name</label>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder='First Name'
              type='text'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='lname' className='block text-sm font-semibold mb-1'>Last Name</label>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              placeholder='Last Name'
              type='text'
              required
            />
          </div>

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
            Sign Up
          </button>

          <div className='mt-4 text-center'>
            <p className='text-sm'>If already signed up? <Link className='text-blue-500 font-semibold' to={'/login'}>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup