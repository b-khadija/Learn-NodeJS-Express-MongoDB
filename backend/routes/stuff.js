const express = require('express');
const router = express.Router();
const Thing = require('../models/Thing');// Importation du modèle 'Thing' de Mongoose qui représente la collection dans la base de données MongoDB


//POST intérecepte les requetes POST
//Enregistre un nouvel objet
router.post('/', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body//Recopie le contenu des objets stuff
  });
  thing.save().then()//Enregistre le produit dans la BDD
    .then(() => res.status(201).json ({ message : 'Objet enregistré' }))
    .catch(error => res.status(400).json ({ error }));
});

//Modifie un objet existant
router.put('/:id', (req, res, next) => {
  //Méthode updateOne de Mongoose pour mettre à jour un Thinf dans BDD
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Objet modifié' }))
    .catch(error => res.status(400).json({ error }));
});


//Supprimer des données
router.delete('/:id', (req, res, next) => {
  //Méthode deleteOne() de Mongoose qui servira a supprimer 
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Objet supprimé' }))
    .catch(error => res.status(400).json({ error }));
});


//Route GET qui permet d'aller chercher un élément avec la méthode findOne() dans notre modèle Thing avec son id 
//On définit une route HTTP GET pour l'URL '/api/stuff/:id'. 
//Le :id est un paramètre dynamique dans l'URL
//Récupère un seul objet
router.get('/:id', (req, res, next) => {
  //model mongoose
  //Recherche d'un document dans la collection 'thing'  
  //dont l'attribut '_id' correspond à la valeur du paramètre 'id' de l'URL
  Thing.findOne({ _id: req.params.id })
    //Si un document est trouvé, répond avec un statut HTTP 200 (OK)
    // et renvoie l'objet 'thing' au format JSON
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
});


//Récupère tous les objets
router.get('/', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports =  router;