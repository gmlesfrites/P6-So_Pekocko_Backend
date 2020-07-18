//Importation de mongoose
const mongoose = require('mongoose');

//création du schéma des infos à stocker
const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    userId: { type: String, required: true},
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
    likes: { type: Number, default:0 },
    dislikes: { type: Number, default:0 }
});

//Création du modèle Sauce
module.exports = mongoose.model('Sauce', sauceSchema);