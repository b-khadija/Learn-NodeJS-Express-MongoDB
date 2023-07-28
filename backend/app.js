const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const app = express();
dotEnv.config();
const mongoUri = process.env.MONGO_URI;
const stuffRoutes = require('./routes/stuff')

// On se connecte à la base de données
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

app.use('/api/stuff', stuffRoutes);

module.exports = app;