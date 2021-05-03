const ArticleModel = require('../models/ArticleModel')

const postArticle = (req, res) => {
    // Sur le deuxième middleware
    // on pourra récuperer la photo avec
    // req.file
    console.log(req.file)
    var newArticle = new ArticleModel({
        titre: req.body.titre,
        contenu: req.body.contenu,
        author: req.body.author,
        // On enregistre le nom de la photo dans la bdd
        photo: req.file.filename
    })

    newArticle.save().then(data => res.json(data)).catch(err => res.json(err))
}


const getAllArticles = (req, res) => {
    ArticleModel.find().then(data => res.json(data))
        .catch(err => res.json(err))
}


const getArticleById = (req, res) => {
    ArticleModel.findById(req.params.id).populate('author').then(data => res.json(data))
        .catch(err => res.json(err))
}



module.exports = {
    postArticle,
    getAllArticles,
    getArticleById
}