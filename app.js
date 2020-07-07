//Création du serveur avec framework Express
const express = require('express');
const app = express();

//Importation des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Importation du package body-parser 
const bodyParser = require('body-parser');

//Importation du package mongoose pour interactions avec base MongoDB
const mongoose = require('mongoose');

//connexion à MongoDB
//TODO souci sécu on voit le mot de passe
mongoose.connect('mongodb+srv://P6:MyP@ssw0rd@gmlesfrites.o009d.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Middleware pour autorisation headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Middleware utilisation bodyParser
app.use(bodyParser.json());

//middleware utilisation des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//Export de l'app Express pour utilisation server.js
module.exports = app;