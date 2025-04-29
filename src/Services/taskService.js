// Services/taskService.js
import TaskModel from "../models/TaskModel";

const taskService = {
  getTasks: TaskModel.getAll,
  createTask: TaskModel.create,
  updateTask: TaskModel.update,
  deleteTask: TaskModel.delete,
  shareTask: TaskModel.share,
};

export default taskService;