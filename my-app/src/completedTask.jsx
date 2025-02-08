// Dashboard.js
import React from 'react';
import { useEffect, useState} from 'react';
import TaskCmp from './taskCmp';
import axios from 'axios';
import Cookies from 'js-cookie';
const CompletedTask = () => {

  const [tasks, setTasks] = useState([]);
 

useEffect(()=>{
  getALLTasks()
},[])
const getALLTasks = async () => {
  const token = Cookies.get('token'); 
  
  try {
    const res = await axios.get('https://taskmanager-project-0iuh.onrender.com/api/task/gettasks', {
      headers: {
        'Authorization': `Bearer ${token}`,  
      },
    });
    const filteredTask=res.data.filter((task)=> task.status==='complete');
    setTasks(filteredTask)
   
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="flex shadow-lg h-auto bg-gray-100 md:mt-10 mt-[90%] w-full md:w-[80%] md:ml-[18%] absolute">
      

      {/* Main Content */}
      <div className="flex-1 p-6 w-full ">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">Completed Task</h2>
          <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
             View Task
          </button>
        </header>

        {/* Task List */}
        <ul className='border-2 flex flex-row flex-wrap justify-center '>
        {tasks.map((item) => (
          <li key={item._id} className='flex flex-row m-5'>  
            <TaskCmp project={item} />
          </li>
        ))}
      </ul>

          
    </div>
    </div>
  );
};

export default CompletedTask;
