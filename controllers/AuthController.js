var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};

// Post registration
userController.doRegister = function(req, res) {
  console.log('registering user');
  User.register(new User({ username : req.body.username, password: req.body.password, studentid: req.body.studentid}), req.body.password, function(err, user) {
    if (err) {
      console.log(err.message)
      return res.render('register', {error:err.message, user: null});
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' })(req, res, function () {
    console.log(passport);
    console.log('passport');
    console.log(res);
    console.log('day la connection');
    console.log(res.connection.session);
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;