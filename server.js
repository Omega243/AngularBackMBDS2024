let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let assignment = require("./routes/assignments");
let matiere = require("./routes/matiere");
let path = require('path');
let { creerUtilisateur } = require("./routes/users");
let {
  log,
  forbidden,
  internalServer,
  unauthorized,
  ok,
  checkAuntification,
} = require("./routes/authentification");


let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

const uri =
  "mongodb+srv://nandrianinaomega:miagembds@cluster0.vkxoifz.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:" +
        port +
        "/api/assignments que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

app.use('/img', express.static(path.join(__dirname, 'img')));

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Obligatoire si déploiement dans le cloud !
let port = process.env.PORT || 8010;

// les routes
const prefix = "/api";

app
  .route(prefix + "/assignments")
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment)
  .get(assignment.getAssignments);

//pour la vue partielle
app
  .route(prefix + "/assignments/:id")
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment)
  .put(assignment.updateAssignment);


app.route(prefix + "/matiere")
  .get(matiere.getMatiereSansPagination)
  .post(matiere.postMatiere);

app.route(prefix + "/users").post(creerUtilisateur);

app.route(prefix + "/authentification").post(log);

app.route(prefix + "/me").post(checkAuntification);

app.route(prefix + "/internal-server").post(internalServer);

app.route(prefix + "/forbidden").post(forbidden);

app.route(prefix + "/unauthorized").post(unauthorized);

app.route(prefix + "/ok").post(ok);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;
