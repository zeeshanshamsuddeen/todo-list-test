const tasksModel = require('./models/tasks');

const dbFunctions = require('./dbFunctions');

const requiredDbFunctions = [
  'findOneAndUpdate',
  'addOne',
  'add',
  'findOne',
  'findOneWithLean',
  'find',
  'findWithSkipLimitLean',
  'count',
  'findWithLean',
  'remove',
  'findAndUpdate',
  'aggregate',
];

const tasks = {};
const accountsDbFunctions = {};

const createDbFunctions = () => {
  requiredDbFunctions.forEach((requiredFunc) => {
    tasks[requiredFunc] = (...args) => dbFunctions[requiredFunc](tasksModel, ...args);
  });
};

createDbFunctions();

const db = {
  tasks,
};

module.exports = db;
