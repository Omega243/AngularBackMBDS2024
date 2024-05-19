let User = require("../model/User");
const jwt = require("jsonwebtoken");
const tokenKey = "nyavkotesttoken";
const bcrypt = require('bcrypt');

async function log(req, res) {
  const { email, mdp } = req.body;

  try {
    const utilisateurTrouve = await User.findOne({ email: email });
    if (utilisateurTrouve) {
      const motDepassvalide = await bcrypt.compare(mdp, utilisateurTrouve.mdp);
      if (motDepassvalide) {
        const token = jwt.sign(
          {
            _id: utilisateurTrouve._id,
          },
          tokenKey,
          {
            expiresIn: "24h",
          }
        );
        console.log(token)
        // const { token: newToken } = await User.findOneAndUpdate(
        //   { _id: utilisateurTrouve._id },
        //   { token: token },
        //   { new: true }
        // );

        //console.log("token", newToken)
        return res.status(200).json({
          data: {
            token: token,
            email: utilisateurTrouve.email,
            nom: utilisateurTrouve.nom,
            prenom: utilisateurTrouve.prenom,
            isAdmin: utilisateurTrouve.isAdmin,
          },
          status: 200,
          message: "User_Authentified",
        });
      } else {
        return res.status(401).json({
          status: 401,
          message: "Mot de passe invalide",
        });
      }
    }
    return res.status(401).json(null);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}


async function checkAuntification(req, res) {
    const {authorization} = req.headers;
    try {
        const tokenobtenu = authorization.split(" ");

        const {_id} = jwt.verify(tokenobtenu[1], tokenKey);
        const utilisateurTrouve = await User.findOne({_id });
        if (utilisateurTrouve) {
            const {_id, email, nom, prenom, role} = utilisateurTrouve;
            return res.status(200).json({
               data: { _id, email, nom, prenom, role},
               status: 200,
               message: "User_Authentified", 
            });
        }
        throw new error ("User_Not_Authentified");
    }catch (error){
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "User_Not_Authentified",
        });
    }
}

function internalServer(_, res) {
    res.status(500).json({
        data: null,
        status: 500,
        message: "INTERNAL_SERVER"
    })
}

function forbidden(_, res) {
    res.status(403).json({
        data: null,
        status: 403,
        message: "FORBIDDEN"
    })
}

function unauthorized(_, res) {
    res.status(401).json({
        data: null,
        status: 401,
        message: "UNAUTHORIZED"
    })
}

function ok(_, res) {
    res.status(200).json({
        data: { ok: true },
        status: 200,
        message: "OK"
    })
}

module.exports = {
    log,
    checkAuntification,
    internalServer,
    forbidden,
    unauthorized,
    ok
}