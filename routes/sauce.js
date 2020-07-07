//utilisation Express
const express = require('express');
const router = express.Router();

//nécessite le fichier sauce du dossier controllers
const sauceControllers = require('../controllers/sauce')

//route pour afficher toutes les sauces
router.get('/', sauceControllers.createSauces);

//route pour créer une sauce
router.post('/', sauceControllers.createSauce);

//route pour afficher les sauces par id
router.get('/:id', sauceControllers.createOneSauce);

//route pour modifier les sauces par id
router.put('/:id', sauceControllers.modifySauce);

//route pour supprimer les sauces par id
router.delete('/:id', sauceControllers.deleteSauce);

module.exports = router;