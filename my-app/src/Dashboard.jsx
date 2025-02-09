import React, { useState, useEffect } from 'react';
import TaskCmp from './taskCmp';
import AddTask from './addtask';
import axios from 'axios';
import Cookies from 'js-cookie';  

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getALLTasks();
  }, []);

  const getALLTasks = async () => {
    const token = Cookies.get('token');  
    try {
      const res = await axios.get('https://taskmanager-project-0iuh.onrender.com/api/task/gettasks', {
        headers: {
          'Authorization': `Bearer ${token}`,  
        },
      });
      setTasks(res.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async (newTask) => {
    const token = Cookies.get('token');  
     
    try {
       await axios.post('https://taskmanager-project-0iuh.onrender.com/api/task/addtask', newTask, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
       
       
      getALLTasks();
    } catch (error) {
      console.error('Error adding task:', error.response.data);
    }
  };

  return (
    <div className="flex shadow-lg h-auto bg-gray-100  md:mt-10 mt-[80%]  md:w-[80%] w-full md:ml-[18%] absolute">
      {/* Main Content */}
      <div className="flex-1 p-6 w-full">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            Add Task
          </button>
          {isModalOpen && (
            <AddTask
              onClose={() => setIsModalOpen(false)}
              onAddTask={handleAddTask}
            />
          )}
        </header>

        {/* Task List */}
        <ul className='border-2 flex flex-col md:flex-row justify-center flex-wrap'>
          {tasks.map((item, index) => (
            <li key={index} className='flex flex-col md:flex-row m-5'>
              <TaskCmp project={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
