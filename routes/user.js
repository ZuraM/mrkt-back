
const express = require('express'),
  router = express.Router(),
  UserController = require('../controllers/UserController');

router.post('/add',  UserController.add);
router.get('/:id', UserController.get);
router.post('/auth', UserController.authenticate);

module.exports = router;
