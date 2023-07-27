const express = require('express');

const app = express();

/*
Premier middleware enregiste 'Requête reçu' dans la console et passe l'exécution
*/
app.use((req, res, next) => {
  console.log('Requête reçu');
  //Next qui va servir à passer à une prochaine une fonction
  next();
});



/*
Deuxième middleware ajoute le code '201' à la réponse et passe l'exécution
*/
app.use((req, res, next) => {
  res.status(201);
  next();
})


/*
Troisième middleware envoie la réponse JSON et passe l'exécution
*/
//Méthode use() pour tous types de requêtes, fonction avec req et res
//Fonction Next va renvoyé à la prochain fonction l'exécution du serveur
app.use((req, res, next ) => {
  //Objet res avec la méthode JSON pour renvoyer une response en json
  res.json({message : 'Votre message à bien été reçue'});
  next();
});


/*
Dernier middleware enregiste 'Réponse envoyer avec succès' dans la console
*/
app.use((req, res) => {
  console.log('Réponse envoyer avec succès');
})

module.exports = app;