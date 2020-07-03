//Création du serveur avec framework Express
const express = require('express');
const app = express();

//Création de la constante d'utilisation du package body-parser 
const bodyParser = require('body-parser');

//Création de la constante d'utilisation du package mongoose pour interactions avec base MongoDB
const mongoose = require('mongoose');

//Création de la constante d'utilisation du Modèle sauce
const Sauce = require('./models/Sauce');

//connexion à MongoDB
//TODO certainement un souci au niveau de ce lien
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

//Middleware POST
//TODO en attente trouver bon lien /api/
app.post('/api/', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
});


//Middleware GET pour afficher les sauces par id
//TODO en attente pour trouver le bon lien /api/
app.get('/api/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
});


//Middleware GET pour afficher les sauces
//TODO en attente trouver bon lien /api/
app.get('/api/', (req, res, next) => {
    Thing.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
});

//Export de l'app Express pour utilisation server.js
module.exports = app;