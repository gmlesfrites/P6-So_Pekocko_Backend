// Importation du package multer
const multer = require('multer');

//gestion du type MIME des fichiers images 
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png' : 'png',
    'image/gif' : 'gif',
    'image/tiff' : 'tiff'
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
    },
    // Pour bloquer les fichiers autres que jpg, jpeg, tiff, gif et png
    fileFilter: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        if(extension !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.tiff') {
            return callback(new Error( "Vous ne pouvez télécharger qu'un fichier image !" ))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
});

module.exports = multer({storage: storage}).single('image');