const Assignment = require('../model/assignment.model');
const Auteur = require('../model/auteur.model');
const Matiere = require('../model/matiere.model');
const Prof = require('../model/prof.model');


// Récupérer tous les matieres (GET)
function getMatieresSansPagination(req, res){
    Matiere.find((err, matieres) => {
        if(err){
            res.send(err)
        }

        res.send(matieres);
    });
}

// Ajout d'une matiere (POST)
function postMatiere(req, res){
    // Matiere & Prof
    let prof = new Prof();
    prof.nom = req.body.prof.nom;
    prof.photo = req.body.prof.photo;
    prof.save();

    let matiere = new Matiere();
    matiere.nom = req.body.nom;
    matiere.photo = req.body.photo;
    matiere.prof = prof;

    console.log("POST matiere reçu :");
    console.log(matiere)

    matiere.save( (err) => {
        if(err){
            res.send('cant post matiere ', err);
        }
        res.json({ message: `${matiere.nom} saved!`})
    })
}

module.exports = { getMatieresSansPagination, postMatiere };
