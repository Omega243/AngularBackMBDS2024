let Assignment = require('../model/assignment');
let router = express.Router();
let assignmentController = require('../controllers/assignmentController');

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
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.studentName = req.body.studentName;
    assignment.studentPhoto = req.body.studentPhoto;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
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
        res.json({message: `${assignment.nom} deleted`});
    })
}

// let newAssignment = new Assignment({
//     id: 7,
//     dateDeRendu: new Date(),
//     nom: "Devoir de mathématiques",
//     rendu: false,
//     studentName: "Lafatra Ravaka",
//     studentPhoto: "img/lafatra.png"
// });

// let newAssignment2 = new Assignment({
//     id: 8,
//     dateDeRendu: new Date(),
//     nom: "Devoir de méthodologie de recherche",
//     rendu: false,
//     studentName: "Ando Fitahiana",
//     studentPhoto: "img/ando.png"
// });

// newAssignment.save((err) => {
//     if (err) {
//         console.error('Erreur lors de la sauvegarde du devoir:', err);
//     } else {
//         console.log('Devoir de mathématiques sauvegardé avec succès!');

//         newAssignment2.save((err) => {
//             if (err) {
//                 console.error('Erreur lors de la sauvegarde du devoir 2:', err);
//             } else {
//                 console.log('Devoir de méthodologie de recherche sauvegardé avec succès!');
//             }
//         });
//     }
// });

router.put('/:id/note', assignmentController.updateAssignmentNote);

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
