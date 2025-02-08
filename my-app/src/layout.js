import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
 
    return (
        <div className="layout">
            <div className='ml-[40%]'>
              
            </div>
             
            <main className="main-content">
               
              
                  
            </main>
             <Outlet/>
        </div>
    );
};

export default Layout;
