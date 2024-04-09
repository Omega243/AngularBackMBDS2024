const User = require('../model/User') ;

const jwt = require('jsonwebtoken') ;
const BCrypt = require('bcrypt') ;

const SECRET_KEY = 'ASSIGNMENT' ;

/* LOGIN */
const login = async (req, res) => {
    const email = req.body.email;
    const mdp = req.body.mdp;

    // Contrôle
    if (!email || !mdp) {
        sendResult(res, { 'error': 'Erreur d\'authentification', 'body': req.body });
    } else {
        const user = await logByMail(email);
        if (user != null) {
            const correctMdp = await BCrypt.compare(mdp, user.mdp);
            if (correctMdp) {
                const token = jwt.sign({ email: user.email, id: user._id, datelogin: new Date().toString() }, SECRET_KEY);
                const intitule = user.nom + ' ' + user.prenom;
                sendResult(res, { token: token, intitule: intitule, iduser: user._id });
            } else {
                sendResult(res, { 'error': 'Erreur d\'authentification', 'body': req.body });
            }
        } else {
            sendResult(res, { 'error': 'Adresse mail invalide', 'body': req.body });
        }
    }
};

/* REGISTER */
const register = async (req, res) => {
    const { nom, prenom, email, mdp } = req.body;

    const user = new User({ nom, prenom, email, mdp });

    let error = controleUnitaire(user);
    if (error !== '') {
        sendResult(res, { 'error': error, 'body': req.body });
    } else {
        const valid = await mailNotExist(user.email);
        if (valid) {
            const intitule = `${user.nom} ${user.prenom}`;

            user.mdp = await BCrypt.hash(req.body.mdp, 10);
            user.save();
            const token = jwt.sign({ email: user.email, id: user._id, datelogin: new Date().toString() }, SECRET_KEY);
            sendResult(res, { token: token, intitule: intitule, iduser: user._id });
        } else {
            sendResult(res, { 'error': 'Cette adresse mail est déjà utilisée', 'body': req.body });
        }
    }
};

function controleUnitaire(user) {
    let error = '' ;
    if (!user.nom || user.nom === '') error = 'Nom invalide' ;
    if (!user.prenom || user.prenom === '') error = 'Prenom invalide' ;
    if (!user.email || user.email === '') error = 'Email invalide' ;
    if (!user.mdp || user.mdp === '') error = 'Mot de passe invalide' ;
    return error ;
}

async function logByMail(email) {
    return User.findOne({ email: email }).then((result) => { 
        return result; 
    }); 
}


/* LOGOUT */
const logout = async (req, res) => {
    sendResult(res, { 'success': 'Utilisateur déconnecté avec succès.', 'body': req.body }) ;
} ;

async function mailNotExist(email) {
    return (User.find({email: email}).count().then((result) => { return result == 0 ; })) ;
}

async function idNotExist(id) {
    return (User.find({'_id': id}).count().then((result) => { return result == 0 ; })) ;
}

function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    login ,
    register,
    logout ,
    idNotExist
}