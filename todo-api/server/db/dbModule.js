const tasksModel = require('./models/tasks');
const accountsModel = require('./models/accounts');

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
const accounts = {};

const createDbFunctions = () => {
  requiredDbFunctions.forEach((requiredFunc) => {
    tasks[requiredFunc] = (...args) => dbFunctions[requiredFunc](tasksModel, ...args);
    accounts[requiredFunc] = (...args) => dbFunctions[requiredFunc](
      accountsModel, ...args,
    );
  });
};

createDbFunctions();

const db = {
  tasks,
  accounts,
};

module.exports = db;
