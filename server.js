let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let matiere = require('./routes/matieres');
let user = require('./routes/user');
let middleware = require('./utils/tokenVerify');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//const uri = 'mongodb+srv://nandrianinaomega:miagembds@cluster0.vkxoifz.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';
const uri = 'mongodb+srv://avoko:Xxdq34F7rr0MS1ea@cluster0.ydvhi7q.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connected to MongoDB assignments database in the cloud!");
    console.log("at URI = " + uri);
    console.log("verify with http://localhost:8010/api/assignments that it works");
  }, err => {
    console.log('Connection error: ', err);
  });

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(middleware.verifyToken, assignment.postAssignment)
  .put(middleware.roleAdmin, assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(middleware.roleAdmin, assignment.deleteAssignment);

app.route(prefix + '/matieres')
  .get(matiere.getMatieresSansPagination)
  .post(matiere.postMatiere)

app.route(prefix + '/auth/login')
  .post(user.login)
  
app.route(prefix + '/auth/register')
  .post(user.register)

app.route(prefix + '/auth/logout')
  .get(middleware.verifyToken, user.logout)

app.route(prefix + '/auth/me')
  .get(middleware.verifyToken, user.getUserConnected)

app.listen(port, "0.0.0.0");
console.log('Server started on http://localhost:' + port);

module.exports = app;
