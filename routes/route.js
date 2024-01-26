const express = require('express');

const { createTask } = require('../controllers/task_create');
const { deleteTask } = require('../controllers/task_delete');
const { getAllTasks, getAllTasksByCategory, viewTaskById, showOverdueTasks } = require('../controllers/show_task');
const { markTaskCompleted } = require('../controllers/mark_complete');
const { updateTask } = require('../controllers/task_update');

const router = express.Router();

router.post('/createTask', createTask);

router.delete('/deleteTask/:taskId', deleteTask);

router.put('/markTaskCompleted/:taskId', markTaskCompleted);
router.put('/updateTask/:taskId', updateTask);

router.get('/viewTaskById/:taskId', viewTaskById);
router.get('/getAllTasks', getAllTasks);
router.get('/getAllTasksByCategory/:categoryId', getAllTasksByCategory);
router.get('/showOverdueTasks', showOverdueTasks);


module.exports = router;
