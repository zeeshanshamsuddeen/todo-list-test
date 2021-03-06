const { tasks } = require('../services');

const getTasks = async (req, res) => {
  const { level, id: taskId } = req.query;
  const queryObject = { level, taskId };
  const tasksResult = await tasks.getTasks(queryObject);
  return res.json({ success: true, tasks: tasksResult.tasks });
};

const getTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { task } = await tasks.getTask(taskId);
  return res.json({ success: true, task });
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  const deleteResponse = await tasks.deleteTask(taskId);
  if (!deleteResponse.success) {
    return res.json({ success: false, error: deleteResponse.error });
  }
  return res.json({ success: true });
};

const completeTask = async (req, res) => {
  const { id: taskId } = req.params;
  const updateResponse = await tasks.completeTask(taskId);
  if (!updateResponse.success) {
    return res.json({ success: false, error: updateResponse.error });
  }
  return res.json({ success: true });
};

const createTask = async (req, res) => {
  const { success, error } = await tasks.createTask(req.body);
  if (!success) {
    return res.status(401).json({ success: false, error });
  }
  return res.json({ success: true });
};

module.exports = {
  getTasks,
  getTask,
  completeTask,
  createTask,
  deleteTask,
};
