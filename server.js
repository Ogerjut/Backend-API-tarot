console.log("Info serveur :")

// importation package http
const http = require('http');
const app = require('./app');

app.set("port", process.env.PORT || 3000 )

// création serveur 
const server = http.createServer(app) 



// pour écouter les requetes d'un port (defaut 3000 sinon var environnement)
server.listen(process.env.PORT || 3000);