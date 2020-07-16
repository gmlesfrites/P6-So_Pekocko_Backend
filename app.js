// Importation du package dotenv
const dotenv = require('dotenv').config();

// Importation du package Helmet (sécurité recommandée par Express)
const helmet = require ('helmet');

//Création du serveur avec framework Express
const express = require('express');
const app = express();

//Importation du package body-parser 
const bodyParser = require('body-parser');

//Importation du package mongoose pour interactions avec base MongoDB
const mongoose = require('mongoose');

//Importation du chemin du fichier images
const path = require('path');

//Importation des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//connexion à MongoDB
mongoose.connect( process.env.MONGO_URL,
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

// Middleware utilisation helmet
app.use(helmet());

//Middleware utilisation bodyParser
app.use(bodyParser.json());

//middleware pour l'accès aux ressources statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

//middleware utilisation des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//Export de l'app Express pour utilisation server.js
module.exports = app;