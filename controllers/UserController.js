const mongoose = require('mongoose'),
  ApiResponse = require('../util/ApiResponse'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  config = require('../config'),
  UserModel = mongoose.model('user');

function UserController() {};

UserController.add = (req, res) => {
  let body = req.body;

  UserModel.create(body, (err, record) => {
    if (err) {
      ApiResponse.failure(res, 'Internal Error', err, 400);
    } else {
      ApiResponse.success(res, record);
    }
  });

};

UserController.get = (req, res) => {
  let id = req.params.id;

  UserModel.findById(id, (err, user) => {
    ApiResponse.success(res, user);
  })
}

UserController.authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return ApiResponse.failure(res, 'Auth error', 'User not found', 400);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign(user.toJSON(), config.authSecret);
      ApiResponse.success(res, {
        token,
        user
      });
    });
  })(req, res, next);
}

module.exports = UserController;