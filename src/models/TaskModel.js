// src/models/TaskModel.js
import Parse from "../parseConfig";

const Task = Parse.Object.extend("Task");

const TaskModel = {
  create: async (data) => {
    const task = new Task();
    // set every field (including taskName, date, priority, tags, etc.)
    Object.keys(data).forEach((key) => task.set(key, data[key]));

    // associate with current user + lock down ACL
    const currentUser = Parse.User.current();
    task.set("owner", currentUser);
    const acl = new Parse.ACL(currentUser);
    task.setACL(acl);

    // defaults
    if (!data.priority) task.set("priority", "Medium");
    if (!data.tags) task.set("tags", []); // ensure we have an array

    return await task.save();
  },

  getAll: async () => {
    const query = new Parse.Query(Task);
    query.equalTo("owner", Parse.User.current());
    const results = await query.find();

    return results.map((t) => ({
      id: t.id,
      taskName: t.get("taskName"),
      date: t.get("date"),
      startDate: t.get("startDate"),
      endDate: t.get("endDate"),
      priority: t.get("priority"),
      tags: t.get("tags") || [],
    }));
  },

  update: async (id, data) => {
    const query = new Parse.Query(Task);
    query.equalTo("owner", Parse.User.current());
    const task = await query.get(id);

    Object.keys(data).forEach((key) => task.set(key, data[key]));
    return await task.save();
  },

  delete: async (id) => {
    const query = new Parse.Query(Task);
    query.equalTo("owner", Parse.User.current());
    const task = await query.get(id);
    await task.destroy();
    return true;
  },
};

export default TaskModel;
