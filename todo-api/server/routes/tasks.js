const express = require('express');

const router = express.Router();

const { asyncRoute } = require('../middlewares');
const { tasks } = require('../controllers');

router.get('/:id', asyncRoute(tasks.getTask));
router.get('/', asyncRoute(tasks.getTasks));

router.post('/', asyncRoute(tasks.createTask));

router.put('/:id/complete', asyncRoute(tasks.completeTask));

router.delete('/:id', asyncRoute(tasks.deleteTask));

module.exports = router;
