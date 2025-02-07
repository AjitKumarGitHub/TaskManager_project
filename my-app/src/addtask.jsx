import React, { useState } from 'react';

const AddTask = ({ onClose, onAddTask}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('incomplete');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      date: new Date(date),
      status,
    };
    onAddTask(newTask);
    onClose();  
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-96">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
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
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
