var express = require('express');

const router = express.Router();
var usersController = require('../src/users/usersController');
router.route('/users').post(usersController.create);
router.route('/users').get(usersController.get);
router.route('/users/:id').get(usersController.get);
router.route('/users/:id').patch(usersController.update);
router.route('/users/:id').delete(usersController.terminate);
module.exports = router;