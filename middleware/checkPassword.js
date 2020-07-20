// Importation du modèle Password 
const passwordSchema = require('../models/Password');

//Vérification de la consistance du mot de passe
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({ error: "Le mot de passe n'est pas assez sécurisé (entre 8 et 15 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, le tout sans espace" + PasswordSchema.validate( req.body.password, { list: true } ) });
    } else {
        next();
    }
}