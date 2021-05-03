//  Importer mongoose
var mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/db", (err) => {
    if(err) console.log(err)
    else console.log("Nous somme bien connecté")
})

module.exports = mongoose.connection