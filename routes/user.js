//Importation d'Express pour création d'un router
const express = require('express');
const router = express.Router();

//nécessite le fichier user du dossier controllers
const userControllers = require('../controllers/user');

//Route pour la première authentification
router.post('/signup', userControllers.signup);

//Route pour l'identification 
router.post('/login', userControllers.login);

module.exports = router;