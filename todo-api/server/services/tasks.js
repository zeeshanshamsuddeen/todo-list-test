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

const deleteTask = async (taskId) => {
  const tasksList = [taskId];
  // level order traversal to remove all children of a task
  while (tasksList.length) {
    const id = tasksList.shift();
    // eslint-disable-next-line no-await-in-loop
    await db.tasks.remove({ taskId: id });
    // eslint-disable-next-line no-await-in-loop
    const children = await db.tasks.findWithLean({ parentId: id });
    const childrenList = children.map((child) => child.taskId);
    tasksList.push(...childrenList);
  }
  return { success: true };
};

const createTask = async ({ level, taskId: parentId, text }) => {
  const initObject = {
    taskId: utils.common.getUUID(),
    text,
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
  deleteTask,
};
