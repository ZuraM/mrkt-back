const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController');

router.post('/add', UserController.add);
router.post('/logIn', UserController.authenticate);

module.exports = router;