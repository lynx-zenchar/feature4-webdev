//// filepath: ./Services/taskService.js
import TaskModel from "../models/TaskModel";

const taskService = {
  getTasks: TaskModel.getAll,
  createTask: TaskModel.create,
  updateTask: TaskModel.update,
  deleteTask: TaskModel.delete,
};

export default taskService;

