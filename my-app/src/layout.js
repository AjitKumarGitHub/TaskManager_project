import React from 'react';
import NavLinkUrl from './NavLink';
 
import {useNavigate,Outlet} from 'react-router-dom';
 
import axios from 'axios'
import Cookies from 'js-cookie'
import Welcome from './welcome';
const Layout = ({ children }) => {

    const Navigate=useNavigate()
     
    const LogOutHandler= async()=>{
      const csrfToken = Cookies.get('csrfToken');
        const res= await axios.post(`http://localhost:5000/api/users/logout`,{},{
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
              {/* <NavLinkUrl/> */}
              {/* <Welcome/> */}
            </div>
             
            <main className="main-content">
                {/* {children}  */}
              
                  
            </main>
             <Outlet/>
        </div>
    );
};

export default Layout;
