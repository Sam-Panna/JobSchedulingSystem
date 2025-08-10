import express from 'express';
import { getEmployees, addTask, getSingleTask, deleteTask, getTaskByEmployee } from '../controller/tasks.js';
import { getAllTasks } from '../controller/tasks.js';

const router = express.Router();

router.get('/employees', getEmployees);
router.post('/add-tasks', addTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getSingleTask);
router.get('/employee-tasks/:id', getTaskByEmployee);
router.delete('/tasks/:id', deleteTask);

export default router;




