// src/models/TaskModel.js
import Parse from "../parseConfig";

const Task = Parse.Object.extend("Task");

const TaskModel = {
  create: async (data) => {
    const task = new Task();
    Object.keys(data).forEach((key) => task.set(key, data[key]));

    // associate with current user + lock down ACL
    const currentUser = Parse.User.current();
    task.set("owner", currentUser);
    const acl = new Parse.ACL(currentUser);

    // defaults
    if (!data.priority) task.set("priority", "Medium");
    if (!data.tags) task.set("tags", []);

    // initialize sharedWith as empty relation
    task.set("sharedWith", []);
    task.setACL(acl);

    return await task.save();
  },

  getAll: async () => {
    const user = Parse.User.current();
    const ownedQ  = new Parse.Query(Task).equalTo("owner", user);
    const sharedQ = new Parse.Query(Task).equalTo("sharedWith", user);
    const mainQ   = Parse.Query.or(ownedQ, sharedQ);
    const results = await mainQ.find();
  
    return results.map((t) => ({
      id: t.id,
      taskName:  t.get("taskName"),
      date:      t.get("date"),
      startDate: t.get("startDate"),
      endDate:   t.get("endDate"),
      priority:  t.get("priority"),
      tags:      t.get("tags") || [],
      // ← pull out the emails of all users in sharedWith
      sharedWith: (t.get("sharedWith") || []).map((u) => u.get("email")),
    }));
  },
  

  update: async (id, data) => {
    // only owner can update
    const query = new Parse.Query(Task);
    query.equalTo("owner", Parse.User.current());
    const task = await query.get(id);

    Object.keys(data).forEach((key) => task.set(key, data[key]));
    return await task.save();
  },

  delete: async (id) => {
    // only owner can delete
    const query = new Parse.Query(Task);
    query.equalTo("owner", Parse.User.current());
    const task = await query.get(id);
    await task.destroy();
    return true;
  },

  share: async (taskId, email) => {
    // only owner can share
    const taskQuery = new Parse.Query(Task);
    taskQuery.equalTo("owner", Parse.User.current());
    const task = await taskQuery.get(taskId);

    // find user by email
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo("email", email);
    const userToShare = await userQuery.first();
    if (!userToShare) throw new Error("User not found");

    // add to sharedWith array and update ACL
    task.addUnique("sharedWith", userToShare);
    const acl = task.getACL();
    acl.setReadAccess(userToShare, true);
    task.setACL(acl);

    await task.save();
    return task;
  },
};

export default TaskModel;