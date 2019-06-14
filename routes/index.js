const express = require('express'),
  passport = require('passport'),
  router = express.Router();

router.use('/user', passport.authenticate('jwt', {
  session: false
}), require('./user'));

router.use('/auth', require('./auth'));

module.exports = router;