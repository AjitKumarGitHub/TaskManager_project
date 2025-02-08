import React, { useState, useEffect } from 'react';
import UpdateTask from './updateTask';
import axios from 'axios';
import Cookies from 'js-cookie';

const TaskCmp = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskddata, setTaskdata] = useState([]);
    const [localProject, setLocalProject] = useState(project);

    const onAddTask = async (updatedTask) => {
        console.log("Updated Task:", updatedTask);
        
        // Update the task in the database
        const token = Cookies.get('token');
        try {
            const res = await axios.put(`https://taskmanager-project-0iuh.onrender.com/task/updatetask/${updatedTask._id}`, updatedTask, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Task updated in database:", res.data);
            
            // Update local state
            setLocalProject(updatedTask); // Update localProject with the updated task
            const updatedTasks = taskddata.map(task => 
                task._id === updatedTask._id ? updatedTask : task
            );
            setTaskdata(updatedTasks);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        const token = Cookies.get('token');
        try {
            await axios.delete(`https://taskmanager-project-0iuh.onrender.com/task/deletetask/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Task deleted from database");
            // Update local state to remove the deleted task
            setTaskdata(taskddata.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    useEffect(() => {
        setLocalProject(project);
    }, [project]);

    useEffect(() => {
        if (taskddata.length > 0) {
            setLocalProject((prev) => ({
                ...prev,
                title: taskddata[0].title,
                description: taskddata[0].description,
                date: taskddata[0].date,
                completeStatus: taskddata[0].status,
            }));
        }
    }, [taskddata]);

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">{localProject.title}</h2>
                <p className="text-gray-700 mb-4">{localProject.description}</p>
                <p className="text-gray-600 mb-2"><strong>Addition Date:</strong> {new Date(localProject.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> {localProject.status}
                </p>
                <div className="flex justify-between mt-4">
                    <button onClick={() => {
                        setIsModalOpen(true);
                        setLocalProject(project); // Set the current project data for editing
                        console.log("Editing Project:", project);
                    }} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                        Edit
                    </button>
                    {isModalOpen && (
                        <UpdateTask editedTask={localProject}
                            onClose={() => {
                                setIsModalOpen(false);
                                console.log("Modal closed");
                            }}
                            onAddTask={onAddTask}
                        />
                    )}
                    <button onClick={() => deleteTask(localProject._id)} className="bg-red-500 text-white px-2 py-0 my-0 rounded-lg hover:bg-red-600">
                        delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCmp;
