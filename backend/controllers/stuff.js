const Thing = require('../models/Thing');

//Enregistre un nouvel objet
exports.createThing = (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body//Recopie le contenu des objets stuff
  });
  thing.save().then()//Enregistre le produit dans la BDD
    .then(() => res.status(201).json ({ message : 'Objet enregistré' }))
    .catch(error => res.status(400).json ({ error }));
}

//Modifie un objet existant
exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Objet modifié' }))
    .catch(error => res.status(400).json({ error }));
}

//Supprimer des données
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Objet supprimé' }))
    .catch(error => res.status(400).json({ error }));
}

//Récupère un seul objet
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
}

//Récupère tous les objets 
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}