//Importation du package bcrypt
const bcrypt = require('bcrypt');

//Importation du package jsonwebtoken
const jsonwebtoken = require('jsonwebtoken');

//Importation du modèle User
const User = require('../models/User');

//Middleware pour l'enregistrement des nouveaux utilisateurs
exports.signup = (req, res, next) => {
    //fonction asynchrone, 10 passages d'algorithme de hash
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //Création de l'utilisateur
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //Sauvegarde dans la base de données
            user.save()
                .then(() => res.status(201).json({ message : 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({error}));
};

//Middleware pour la connexion des utilisateurs existants
exports.login = (req, res, next) => {
    //recherche par email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //utilisation bcrypt pour comparer les mots de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Le mot de passe est incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsonwebtoken.sign(
                            //vérification de l'identifiant utilisateur
                            { userId: user._id},
                            // TODO à remplacer par un string aléatoire
                            'random_token_secret',
                            //token valable 24h
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        //si problème de connexion serveur
        .catch(error => res.status(500).json({ error }));
};