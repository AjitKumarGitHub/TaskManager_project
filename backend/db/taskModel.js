import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['incomplete', 'complete'],
    default: 'incomplete',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user model
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
