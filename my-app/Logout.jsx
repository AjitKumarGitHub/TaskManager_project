import React from 'react'
import { useNavigate } from 'react-router-dom'
import {axios} from 'axios'
const Logout = () => {
  const Navigate=useNavigate()
    
    const handler= async()=>{
        const res= await axios.post(`https://taskmanager-project-0iuh.onrender.com/api/users/login`)
        if(res.status===2000){
           alert('Successfully Logout')
           Navigate('/signup')
        }
    }
  return (
    <div>
       <button onClick={handler}>LogOut</button>
    </div>
  )
}

export default Logout
