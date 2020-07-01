//Creation du serveur avec framework Express
const express = require('express');
const app = express();

//Middleware pour autoriser certains headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Middleware classique -> ôter next si dernier middleware
app.use((req, res, next) => {
    res.json({ message: 'votre requête a bien été reçue' });
})

//Export de l'app Express pour utilisation server.js
module.exports = app;