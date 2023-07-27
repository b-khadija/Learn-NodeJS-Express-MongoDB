//Création d'un serveur HTTP simple en NodeJs avec le module "http"
const http = require('http');
const app = require('./app');

// const server = http.createServer((req, res) => {
//Déclaration d'une fonction avec la méthode createServer qui prend en argument req et res (requête et réponse)
//   res.end('voilà la réponse du serveur');
// });

//Indiquer à l'application express sur quel Port elle doit tourner
// app.set('port', process.env.PORT || 3000);
// const server = http.createServer(app);

//Par défaut le port 3000 en développement, si port 3000 déjà pris utilisé 
//la variable d'environnement du port grâce à 'process.env.PORT'
// server.listen(process.env.PORT || 3000);

//normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);
server.on('error', errorHandler);

//écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);