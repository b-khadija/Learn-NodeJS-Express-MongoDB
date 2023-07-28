const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/Thing');// Importation du modèle 'Thing' de Mongoose qui représente la collection dans la base de données MongoDB
const dotEnv = require('dotenv');
const app = express();
dotEnv.config();

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected To Database'))
  .catch(() => console.log('Connected To Database failed'));

//Middleware express qui prend toutes les requêtes qui ont comme Content-Type
//application/json et met à disposition leur body directement sur l'objet req
app.use(express.json());

//Premier middleware général et appliquer a toutes les routes et requetes envoyées à notre serveurs 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//POST intérecepte les requetes POST
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body//Recopie le contenu des objets stuff
  });
  thing.save().then()//Enregistre le produit dans la BDD
    .then(() => res.status(201).json ({ message : 'Objet enregistré' }))
    .catch(error => res.status(400).json ({ error }));
});

//Modifier et supprimer des données
app.put('/api/stuff/:id', (req, res, next) => {
  //Méthode updateOne de Mongoose pour mettre à jour un Thinf dans BDD
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Objet modifié' }))
    .catch(error => res.status(400).json({ error }));
});


//Supprimer des données
app.delete('/api/stuff/:id', (req, res, next) => {
  //Méthode deleteOne() de Mongoose qui servira a supprimer 
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Objet supprimé' }))
    .catch(error => res.status(400).json({ error }));
});


//Route GET qui permet d'aller chercher un élément avec la méthode findOne() dans notre modèle Thing avec son id 
//On définit une route HTTP GET pour l'URL '/api/stuff/:id'. 
//Le :id est un paramètre dynamique dans l'URL
app.get('/api/stuff/:id', (req, res, next) => {
  //model mongoose
  //Recherche d'un document dans la collection 'things'  
  //dont l'attribut '_id' correspond à la valeur du paramètre 'id' de l'URL
  Thing.findOne({ _id: req.params.id })
    //Si un document est trouvé, répond avec un statut HTTP 200 (OK)
    // et renvoie l'objet 'thing' au format JSON
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
});


//Les routes qui commencent par "/api/stuff".
//Toutes les requêtes avec une URL qui commence par "/api/stuff" seront acheminées vers ce middleware
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;