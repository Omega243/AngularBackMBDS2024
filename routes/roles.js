var express = require('express');
var router = express.Router();

const { findAll, save } = require('../service/RoleService') ;

/* Récupération des rôles */
router.get('/', findAll) ;

/* Insertion de rôle */
router.post('/role', save) ;

module.exports = router ;