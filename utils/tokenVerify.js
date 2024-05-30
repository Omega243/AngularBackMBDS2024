var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
try{
  const token = req.headers.authorization.split(" ")[1];

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    
    // 
    req.userId = decoded.id;
    next();
  });

}
catch(error){
  return res.status(500).send({ auth: false, message: error.message });

}
  
}
function roleAdmin(req, res, next) {
  
  const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err){
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      
      if (decoded.role !== 1) {
        return res.status(403).send({ auth: false, message: 'Accès refusé. Rôle insuffisant.' });
      }
      //
      req.userId = decoded.id;
      next();
    });
  }
  

module.exports = {verifyToken,roleAdmin};