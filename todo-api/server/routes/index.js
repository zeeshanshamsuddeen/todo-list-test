const express = require('express');

const middlewares = require('../middlewares');
const accounts = require('./accounts');
const tasks = require('./tasks');

const router = express.Router();

router.use('/accounts', accounts);
router.use('/tasks', middlewares.authenticateApi, tasks);

module.exports = router;
