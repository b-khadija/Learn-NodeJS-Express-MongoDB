const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotEnv = require('dotenv');
const appTwo = express();
dotEnv.config();

const mongoUri = process.env.MONGO_URI;

// On se connecte à la base de données
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected To Database'))
  .catch(() => console.log('Connected To Database failed'));

appTwo.use(express.json());

appTwo.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Récupère tous les produits
appTwo.get('/api/products', (req, res, next) => {
  Product.find()
    .then(products => res.status(200).json({ products }))
    .catch(error => res.status(400).json({ error }));
});

//Récupère un seul produit
appTwo.get('/api/products/:id', (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error }));
});

//Enregistre un nouveau produit
appTwo.post('/api/products', (req, res, next) => {
  const product = new Product({
    ...req.body
  });
  product.save().then()
    .then(() => res.status(201).json ({ product }))
    .catch(error => res.status(400).json ({ error }));
});

//Modifie un produit existant
appTwo.put('/api/products/:id', (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Modifié' }))
    .catch(error => res.status(400).json({ error }));
});

//Supprime un produit existant
appTwo.delete('/api/products/:id', (req, res, next) => {
  //Méthode deleteOne() de Mongoose qui servira a supprimer 
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Supprimé' }))
    .catch(error => res.status(400).json({ error }));
});


module.exports = appTwo;