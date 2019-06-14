const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController');

router.post('/logIn', UserController.authenticate);

module.exports = router;