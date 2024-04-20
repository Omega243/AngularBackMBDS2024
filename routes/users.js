var express = require('express');
var router = express.Router();
var User = require("../model/User");

const { login, register, logout } = require('../service/UserService') ;

/* LOGIN */
router.post('/login', login) ;

/* INSCRIPTION */
router.post('/register', register) ;

/* LOGOUT */
router.post('/logout', logout) ;

/* TEST */
router.get('/test', function (req, res) {
    res.status(200).json('Test works normally !') ;
}) ;

function getUsersByRole(req, res) {
    let userRole = req.params.role;
  
    User.find({ role: userRole }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
}

function getUserById(req, res) {
    let userId = req.params.id;
  
    User.findById(userId, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
}

module.exports = { router, getUsersByRole, getUserById };
