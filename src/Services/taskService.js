// filepath: ./Services/taskService.js

import TaskModel from "../models/TaskModel";

const taskService = {
  getTasks: async () => {
    try {
      const tasks = await TaskModel.getAll();
      return tasks;
    } catch {
      throw new Error("Failed to fetch tasks");
    }
  },

  createTask: async (taskData) => {
    try {
      await TaskModel.create(taskData);
    } catch {
      throw new Error("Failed to create task");
    }
  }
};

export default taskService;



