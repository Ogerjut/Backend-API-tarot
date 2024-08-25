const  express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game')
// création app express 
const app = express()

// connecte la bdd mangoose atlas (cloud) à l'API
mongoose.connect('mongodb+srv://root:root@cluster.pc82glp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// ce middleware intercepte toutes les requetes content/type json > permet d'accéder au corps de la req
app.use(express.json())

// ce middleware executé par l'app pour permettre CORS (pas d'url car appliqué à toutes les req)
app.use(cors())

app.get('/', (req, res) => res.status(200).json({message: 'Hello from server!'}))

// middleware permettant d'accéder aux routes de l'API
app.use('/auth', userRoutes);
app.use('/game', gameRoutes);

  
// pour accéder à l'app express depuis n'importe quel fichier js
module.exports = app