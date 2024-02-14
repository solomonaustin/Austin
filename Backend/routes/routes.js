let express = require('express');

const router = express.Router();
let todosController = require('../src/todos/todosController');
router.route('/todos').post(todosController.create);
router.route('/todos').get(todosController.get);
router.route('/todos/:id').get(todosController.get);
router.route('/todos/:id').patch(todosController.update);
router.route('/todos/:id').delete(todosController.terminate);
module.exports = router;