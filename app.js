//Création du serveur avec framework Express
const express = require('express');
const app = express();

//Création de la constante d'utilisation de la route sauce
const sauceRoutes = require('./routes/sauce');

//Création de la constante d'utilisation du package body-parser 
const bodyParser = require('body-parser');

//Création de la constante d'utilisation du package mongoose pour interactions avec base MongoDB
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

//Middleware pour autorisation headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Middleware utilisation bodyParser
app.use(bodyParser.json());

//middleware utilisation des routes
app.use('/api/sauces', sauceRoutes)

//Export de l'app Express pour utilisation server.js
module.exports = app;