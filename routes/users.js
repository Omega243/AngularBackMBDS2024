var express = require('express');
var router = express.Router();

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

module.exports = router;
