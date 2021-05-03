const mongoose = require('mongoose');


const ArticleSchema = new mongoose.Schema({
    titre: String,
    contenu: String,
    photo: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    author: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectID
    }
})

const ArticleModel = mongoose.model('articles', ArticleSchema)


module.exports = ArticleModel