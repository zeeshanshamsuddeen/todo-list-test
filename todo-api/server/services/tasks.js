const utils = require('../shared/utils');
const db = require('../db/dbModule');
const { keywords } = require('../constants');

const getTasks = async ({ level, taskId }) => {
  const queryObject = { level };
  if (taskId) queryObject.parentId = taskId;
  const tasks = await db.tasks.findWithLean(queryObject);
  return { tasks };
};

const getTask = async (taskId) => {
  const task = await db.tasks.findOneWithLean({ taskId });
  return { task };
};

const completeTask = async (taskId) => {
  const taskFromDb = await db.tasks.findOneWithLean({ taskId });
  if (!taskFromDb) {
    return { success: false, error: 'Task Not Found' };
  }
  await db.tasks.findOneAndUpdate({ taskId }, { status: keywords.COMPLETED });
  return { success: true };
};

const createTask = async ({ level, taskId: parentId }) => {
  const initObject = {
    taskId: utils.common.getUUID(),
    level,
    status: keywords.ACTIVE,
  };
  if (parentId) initObject.parentId = parentId;
  await db.tasks.addOne(initObject);
  return { success: true };
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  completeTask,
};
