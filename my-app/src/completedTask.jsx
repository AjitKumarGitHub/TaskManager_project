// Dashboard.js
import React from 'react';
import { useEffect, useState} from 'react';
import TaskCmp from './taskCmp';
import axios from 'axios';
import Cookies from 'js-cookie';
const CompletedTask = () => {

  const [tasks, setTasks] = useState([]);
//   const tasks = [{
//     "title" :"Project Management Tool",
//     "description":"This project management tool  nd reminders, users can stay updated on their tasks and deadlines.",
//     "additionDate": "2023-10-01",
//     "completedStatus": true,
//     "incompleteStatus": false,
//    }, 
//    {
//     "title" :"Project Management Tool",
//     "description":"This project management tool  nd reminders, users can stay updated on their tasks and deadlines.",
//     "additionDate": "2023-10-01",
//     "completedStatus": true,
//     "incompleteStatus": false,
//    },
//    {
//     "title" :"Project Management Tool",
//     "description":"This project management tool  nd reminders, users can stay updated on their tasks and deadlines.",
//     "additionDate": "2023-10-01",
//     "completedStatus": true,
//     "incompleteStatus": false,
//    },
//    {
//     "title" :"Project Management Tool",
//     "description":"This project management tool  nd reminders, users can stay updated on their tasks and deadlines.",
//     "additionDate": "2023-10-01",
//     "completedStatus": true,
//     "incompleteStatus": false,
//    },
//    {
//     "title" :"Project Management Tool",
//     "description":"This project management tool  nd reminders, users can stay updated on their tasks and deadlines.",
//     "additionDate": "2023-10-01",
//     "completedStatus": true,
//     "incompleteStatus": false,
//    }


// ]

useEffect(()=>{
  getALLTasks()
},[])
const getALLTasks = async () => {
  const token = Cookies.get('token'); // Get the token from cookies
  // console.log("JWT Token:", token); // Log the token
  try {
    const res = await axios.get('http://localhost:5000/api/task/gettasks', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the headers
      },
    });
    const filteredTask=res.data.filter((task)=> task.status==='complete');
    setTasks(filteredTask)
    // console.log(tasks);
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
            delete Task
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
