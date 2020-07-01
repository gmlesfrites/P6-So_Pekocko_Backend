//Creation du serveur avec framework Express
const express = require('express');
const app = express();

//Utilisation du package body-parser  pour transformer le corps de requête en JSON
const bodyParser = require('body-parser');

//Utilisation du package Mongoose pour interactions avec base sur MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://P6:MyP@ssw0rd@gmlesfrites.o009d.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Middleware pour autoriser certains headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Middleware utilisation bodyParser
app.use(bodyParser.json());

//Middleware POST -> exemple
app.post((req, res, next) => {
    res.status(201).json({ message: 'objet créé' });
})

//Middleware classique -> ôter next si dernier middleware
app.use((req, res, next) => {
    res.json({ message: 'votre requête a bien été reçue' });
})

//Export de l'app Express pour utilisation server.js
module.exports = app;