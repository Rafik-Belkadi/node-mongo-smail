// importer la librairie multer
const multer = require('multer')
// multer permet d'uploader des fichiers dans notre
// serveur

// Storage est un object de configuration
var storage = multer.diskStorage({
    // destination pour modifier la destinations des fichiers
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    // On peut modifier le nom du fichier uploadé sur le serveur 
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// upload est l'object qui nous fourni les fonctions pour uploader un fichier
var upload = multer({ storage: storage })

// upload.single('leNomDuChamp dans le body de la requete')
// upload.array([])

module.exports = upload;