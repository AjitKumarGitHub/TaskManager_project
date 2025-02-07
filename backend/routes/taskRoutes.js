import express from 'express'
import controllers from '../controllers/taskController.js';
import authenticate from "../middleware/authenticate.js"
const {addTask, getTasks, deleteTask,updateTask} = controllers;
const router=express.Router();

router.post('/addtask',authenticate,addTask);
router.get('/gettasks',authenticate,getTasks);
router.delete('/deletetask/:id',authenticate,deleteTask);
router.put('/updatetask/:id',authenticate,updateTask);

export default router;