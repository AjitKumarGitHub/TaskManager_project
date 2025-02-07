import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkUrl = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='z-50 text-2xl   w-full p-2 bg-cyan-500 fixed shadow-lg shadow-cyan-500/50 text-yellow-50 top-0'>
      <button onClick={() => setIsOpen(!isOpen)} className='md:hidden'>
        {isOpen? 'Close' : 'Open'}
      </button>
      <div className={`flex flex-col md:flex-row text-center  ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className='mx-10 flex flex-col md:flex-row space-x-8'>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/signup'}>Signup</NavLink>
          </li>
          <li>
            <NavLink to={'/login'}>Login</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavLinkUrl;
