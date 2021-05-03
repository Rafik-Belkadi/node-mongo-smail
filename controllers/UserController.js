const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')

const getAllUsers = (req, res) => {
    UserModel.find().then(users => res.json(users)).catch(err => { throw err })
}


const createUser = (req, res) => {
    // On récupère le le body de la requête et on le met dans une variable
    var user = req.body
    // Vérifier si l'email existe déja avant la création
    UserModel.find({ email: user.email }).then(data => {
        // si le resultat retourné n'est pas vide, l'email est déjà utilisé 
        if (data.length != 0) {
            res.json({
                message: "Email déja utilisé"
            })
        } else {
            // Sinon on commence par crypté le password entré
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    res.json(err)
                } else {
                    // bcrypt.hash(passwordEnClair , saltRounds, callback(err,hash))
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) {
                            res.json(err)
                        } else {
                            // Après avoir crypté le password, on peut maintenant enrengistré l'user dans la bdd
                            // avec le password crypté (hash)
                            var newUser = new UserModel({
                                email: user.email,
                                password: hash,
                                name: user.name
                            })
                            // On retourne le resultat
                            newUser.save().then(result => res.json(result)).catch(err => res.json(err))
                        }
                    })
                }
            })
        }
    })


    // Si il n'existe pas, on va crypter le mot de passe avant de le mettre dans la bdd



}

const login = (req, res) => {
    // Credentials : identifiants pour se connecter (email et password)
    var credentials = req.body
    // On doit d'abord chercher l'utilisateur avec le même email
    UserModel.find({ email: credentials.email }).then(results => {
        // Si le tableau de resultat est vide
        if (results.length == 0) {
            // L'utilisateur n'existe pas
            res.json({
                message: "utilisateur introuvable"
            })
        } else {
            // sinon je met l'utilisateur trouvé dans une variable
            var userFound = results[0]

            // Vérifier que le mot de passe dans credentials est le même que celui de userFound
            bcrypt.compare(credentials.password, userFound.password, (err, same) => {
                //  si la variable same == false
                if (!same) {
                    // les mots de passes ne correspondent pas
                    res.json({
                        message: "Email ou mot de passe incorrect"
                    })
                } else {
                    // sinon retourné l'utilisateur connecté
                    res.json({
                        user: userFound,
                        message: "Vous êtes bien connecté"
                    })
                }
            })
        }
    })
}


module.exports = {
    getAllUsers,
    createUser,
    login
}