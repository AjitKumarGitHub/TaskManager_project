import Task from '../db/taskModel.js';

// Assuming you have a middleware that sets req.user with the authenticated user
export const addTask = async (req, res) => {
  const { title, description, date, status } = req.body;
  
  try {
    const newTask = new Task({
      title,
      description,
      date,
      status,
      user: req.user._id, // Set the user ID from the authenticated user
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error saving task:", error); // Debugging line
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
    
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        res.status(200).send("Task deleted successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
     // Log incoming data
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
         
        res.status(200).json(task);
    } catch (error) {
        console.error("Error updating task:", error); // Log any errors
        res.status(500).json({ message: error.message });
    }
};

export default { addTask, getTasks, deleteTask, updateTask };
