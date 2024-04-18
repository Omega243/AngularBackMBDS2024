const Role = require("../model/Role") ;

/* LISTE */
const findAll = async (req, res) => {
    Role.find({}).then((result) => sendResult(res, result)) ;
} ;

/* ENREGISTREMENT */
const save = async (req, res) => {
    if (req.body.intitule === '') {
        const error = 'Nom du rôle invalide' ;
        const result = {
            error: error,
            body: req.body
        } ;
        sendResult(res, result) ;
    } else {
        await new Role({intitule: req.body.intitule}).save() ;
        Role.find({intitule: req.body.intitule}).then((result) => sendResult(res, result)) ;
    }
} ;

const roleUser = async () => {
    return Role.findOne({intitule: 'Student'}).then((result) => { return result ; }) ;
} ;

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

/***************
 * EXPORTATION *
 **************/
module.exports = {
    findAll ,
    save ,
    roleUser
}