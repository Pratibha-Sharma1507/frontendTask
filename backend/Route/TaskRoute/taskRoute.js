const express = require('express');
const taskRouter = express.Router();
const {postTask,getUserId,deleteTask,updateTask} = require('../../Controller/Task/task');


taskRouter.post('/addTask',postTask)
taskRouter.get('/viewuser',getUserId)
taskRouter.patch('/updateTask',updateTask)
taskRouter.delete('/deleteTask',deleteTask)

module.exports = taskRouter;