import React from 'react';
 
 
import {useNavigate,Outlet} from 'react-router-dom';
 
import axios from 'axios'
import Cookies from 'js-cookie'
 
const Layout = ({ children }) => {

    const Navigate=useNavigate()
     
    const LogOutHandler= async()=>{
      const csrfToken = Cookies.get('csrfToken');
        const res= await axios.post(`https://taskmanager-project-0iuh.onrender.com/users/logout`,{},{
          headers:{
            'X-CSRF-Token': csrfToken,
          },
        })

        Cookies.remove('access_token')
        if(res.status===200){
           alert('Successfully Logout')
           
          
           Navigate('/login')
        }
      }




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
