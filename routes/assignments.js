let Assignment = require("../model/assignment");
const Auteur = require("../model/auteur");
let Matiere = require("../model/matiere");

// Récupérer tous les assignments (GET)
/*
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}
*/

function getAssignments(req, res) {
  let aggregateQuery = Assignment.aggregate();

  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, data) => {
      if (err) {
        res.send(err);
      }

      res.send(data);
    }
  );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;
  Assignment.findById(assignmentId, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json(assignment);
  });
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res) {
  try {
    // Check if necessary fields are provided in the request body
    if (!req.body.nom || !req.body.dateDeRendu || !req.body.auteur || !req.body.matiere) {
      return res.status(400).send("Missing required fields");
    }

    let assignment = new Assignment();
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = false;
    assignment.remarque = req.body.remarque;

    // Validate and create Auteur
    let auteur = new Auteur();
    if (req.body.auteur.nom && req.body.auteur.photo) {
      auteur.nom = req.body.auteur.nom;
      auteur.photo = req.body.auteur.photo;
      await auteur.save();
      assignment.auteur = auteur;
    } else {
      return res.status(400).send("Missing author details");
    }

    // Validate and create Matiere
    let matiere = new Matiere();
    if (req.body.matiere.nom && req.body.matiere.photo) {
      matiere.nom = req.body.matiere.nom;
      matiere.photo = req.body.matiere.photo;
      await matiere.save();
      assignment.matiere = matiere;
    } else {
      return res.status(400).send("Missing subject details");
    }

    console.log("POST assignment reçu :");
    console.log(assignment);

    // Save assignment
    await assignment.save();
    res.json({ message: `${assignment.nom} saved!` });
  } catch (err) {
    res.status(500).send("Error saving assignment: " + err.message);
  }
}


// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
// l'id est bien le _id de mongoDB
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
};
