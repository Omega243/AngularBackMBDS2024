let Assignent = require("../model/assignmentView");

//Récupérer toules les assignments (GET)
function getAssignments(req, res) {
  var aggregateQuery = Assignent.aggregate();

  Assignment.aggregatePaginate(aggregateQuery, {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,  
  }, (err, data) => {
      if (err) {
          res.send(err)
      }
      res.send(data);
  });
}

// Récupérer un assignment par son id (GET)

function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignent.findById(assignmentId, (err, assignment) => {
        if(err){res.send(err)}
        res.json(assignment);
    })
}

//Ajout d'un assignment (POST)

function postAssignment(req, res){
    let assignment = new Assignent();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.idMatiere = req.body.idMatiere;
    assignment.idEleve = req.body.idEleve;

    console.log("POST assignment requé :");
    console.log(assignment);

    assignment.save((err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({message: `${assignment.nom} saved!`})
    })
}

//Update d'un assignment (PUT)
function updateAssignment(req, res){
    console.log("UPDATE recu assignment :");
    console.log(req.body);

    Assignent.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }
    });
}

//Suppression d'un assignment (DELETE)
function deleteAssignment(req, res){

    Assignent.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

module.exports = {getAssignments, getAssignment, postAssignment, updateAssignment, deleteAssignment}