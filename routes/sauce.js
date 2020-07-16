//utilisation Express
const express = require('express');
const router = express.Router();


//Nécessite le middleware authentification
const authentication = require('../middleware/auth');

//Nécessite le multer pour gestion des images
const multer = require ('../middleware/multer-config');


//nécessite le fichier sauce du dossier controllers
const sauceControllers = require('../controllers/sauce');

//route pour créer une sauce
router.post('/', authentication, multer, sauceControllers.createSauce);

//route pour modifier les sauces par id
router.put('/:id', authentication, multer, sauceControllers.modifySauce);

//route pour supprimer les sauces par id
router.delete('/:id', authentication, sauceControllers.deleteSauce);

//route pour afficher les sauces par id
router.get('/:id', authentication, sauceControllers.createOneSauce);

//route pour afficher toutes les sauces
router.get('/', authentication, sauceControllers.createSauces);

//route pour 'like'
router.post('/:id/like', authentication, sauceControllers.sauceLikeOrDislike);

module.exports = router;