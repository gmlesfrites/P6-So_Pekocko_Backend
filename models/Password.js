// Importation du package password-validator
const passwordValidator = require('password-validator');
 
// Create a schema
const passwordSchema = new passwordValidator();
 
// Add properties to it
passwordSchema
    .is().min(8)                                    // Minimum 8 caractères
    .is().max(15)                                  // Maximum 15 caractères
    .has().uppercase()                              // Doit contenir au moins un caractère en majuscule
    .has().lowercase()                              // Doit contenir au moins un caractère en minuscule
    .has().digits()                                 // Doit contenir au moins 1 chiffre
    .has().not().spaces()                           // Ne contient pas d'espace
    .is().not().oneOf(['Passw0rd', 'Password123', '123456', 'azerty', 'secret' ]); // Blacklist des mdp les + piratés

module.exports = passwordSchema ;