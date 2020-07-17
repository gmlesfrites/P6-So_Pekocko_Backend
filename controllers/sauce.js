const Sauce = require("../models/Sauce"); //Importation du modèle sauce
const filesystem = require('fs'); //Importation du package fs(gestion fichiers importés)

//Middleware de création d'une sauce - route L15
exports.createSauce = (req, res, next) => {
    //Extraction objet sauce
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        //pour récupérer l'url complète de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

//Middleware de récupération des sauces par id - route L24
exports.createOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//Middleware de modification d'une sauce (par id) - route L18
exports.modifySauce = (req, res, next) => {
    //Condition s'il y a ou non modification du fichier image    
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            //pour récupérer l'url complète de l'image
            imageUrl: `$${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

//Middleware de suppression d'une sauce (par id) - route L21
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            //Récupération du nom du fichier image à supprimer
            const filename = sauce.imageUrl.split('/images/')[1];
            //suppression du fichier image puis de la sauce
            filesystem.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Sauce supprimée!' }); })
                    .catch((error) => { res.status(400).json({ error: error }); });
            })
        })
        .catch(error => res.status(500).json({ error }));
};

//Middleware de récupération des sauces - route L27
exports.createSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Middleware pour like et dislike - route L32 
exports.sauceLikeOrDislike = (req, res, next) => {
    // Ajoute un 'like' 
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, {$inc: {likes: req.body.like++} , $push: {usersLiked: req.body.userId}})
            .then (sauce => res.status(200).json({ message: "L'utilisateur aime cette sauce !"}))
            .catch(error => res.status(400).json({ error }));

    // Ajoute un 'dislike'
    } else if (req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id },  {$inc: {dislikes: (req.body.like++)*-1} , $push: {usersDisliked: req.body.userId}})
            .then (sauce => res.status(200).json({ message: "L'utilisateur n'aime pas cette sauce !"}))
            .catch(error => res.status(400).json({ error }));

    // Enlève un 'like' ou un 'dislike'
    } else { 
        Sauce.findOne({_id: req.params.id})
            .then(sauce => {
                // Enlève un 'like'
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}})
                    .then(sauce => res.status(200).json({ message: "L'utilisateur enlève un 'like' !"})) 
                    .catch(error => res.status(400).json({ error }))

                // Enlève un 'dislike'
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}})
                    .then(sauce => res.status(200).json({ message: " L'utilisateur enlève un 'dislike' !"})) 
                    .catch(error => res.status(400).json({ error }))  
                }
            })
            .catch(error => res.status(400).json({ error }));
    }
};