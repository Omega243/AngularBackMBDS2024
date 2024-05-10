var User = require("../model/User");
const bcrypt = require('bcrypt');

async function creerUtilisateur(req, res) {
  let user = new User();
  user.nom = req.body.nom;
  user.prenom = req.body.prenom;
  user.email = req.body.email;
  user.mdp = await BCrypt.hash(req.body.mdp, 10);
  user.role = req.body.role;

  user.save((error) => {
    if (error) {
      if (error.name.includes("MongoError") && error.code === 11000) {
        return res.status(400).json({
          error: "Cet email est déjà utilisé",
          status: 400,
          message: "utilisateur n'est pas enregitré",
        })
      }
      return;
    }

    const userRetourne = {
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
    }

    return res.status(201).json({
      data: userRetourne,
      status: 201,
      message: "utilisateur enregitré",
    })
  })
}

module.exports = { creerUtilisateur };
