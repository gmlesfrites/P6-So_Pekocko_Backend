//utilisation Express
const express = require('express');
const router = express.Router();

//nécessite le fichier sauce du dossier controllers
const routeControllers = require('../controllers/sauce')

//route pour afficher toutes les sauces
router.get('/', routeControllers.createSauces);

//route pour créer une sauce
router.post('/', routeControllers.createSauce);

//route pour afficher les sauces par id
router.get('/:id', routeControllers.createOneSauce);

//route pour modifier les sauces par id
router.put('/:id', routeControllers.modifySauce);

//route pour supprimer les sauces par id
router.delete('/:id', routeControllers.deleteSauce);

module.exports = router;