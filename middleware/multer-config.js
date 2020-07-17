// Importation du package multer
const multer = require('multer');

//gestion du type MIME des fichiers images 
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png' : 'png'
};

//Pour l'enregistrement des images
const storage = multer.diskStorage({
    //dossier images
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //nom et extension du fichier + ajout timestamp pour creation d'un fichier daté
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');