// src/models/TaskModel.js
import Parse from "../parseConfig";

const Task = Parse.Object.extend("Task");

const TaskModel = {
  create: async (data) => {
    const task = new Task();
    Object.keys(data).forEach(key => task.set(key, data[key]));
    // Ensure a default priority if none provided
    if (!data.priority) task.set("priority", "Medium");
    return await task.save();
  },
  getAll: async () => {
    const query = new Parse.Query(Task);
    const results = await query.find();
    return results.map(task => ({
      id: task.id,
      taskName: task.get("taskName"),
      date: task.get("date"),
      startDate: task.get("startDate"),
      endDate: task.get("endDate"),
      priority: task.get("priority")    // ← include priority
    }));
  },
  update: async (id, data) => {
    const query = new Parse.Query(Task);
    const task = await query.get(id);
    Object.keys(data).forEach(key => task.set(key, data[key]));
    return await task.save();
  },
  delete: async (id) => {
    const query = new Parse.Query(Task);
    const task = await query.get(id);
    await task.destroy();
    return true;
  },
};

export default TaskModel;

