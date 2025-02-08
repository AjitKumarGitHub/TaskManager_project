import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UpdateTask = ({ onClose, onAddTask, editedTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('incomplete');

  useEffect(() => {
    if (editedTask) {
      setTitle(editedTask.title);
      setDescription(editedTask.description);
      setDate(editedTask.date);
      setStatus(editedTask.status);
    }
  }, [editedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description, date, status, _id: editedTask._id };
     
    
    const token = Cookies.get('token');
    try {
      const res = await axios.put(`https://taskmanager-project-0iuh.onrender.com/task/updatetask/${updatedTask._id}`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Task updated in database:", res.data);
      onAddTask(updatedTask); 
    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error.message);
    }

    onClose();  
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-96">
        <h2 className="text-xl font-bold mb-4">Edit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              value={description}
                  onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
