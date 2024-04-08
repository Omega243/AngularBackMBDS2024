var User = require("../model/User");

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

module.exports = { getUsersByRole, getUserById };
