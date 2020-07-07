//Importation de mongoose + plugin unique-validator
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//création du schéma des infos à stocker
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Plugin pour la gestion des emails (un seul compte par email)
userSchema.plugin(uniqueValidator);

//Création du modèle User
module.exports = mongoose.model('User', userSchema);