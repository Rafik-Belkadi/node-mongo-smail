var router = require('express').Router()
const UserController = require('../controllers/UserController')

router.route('/users').get(UserController.getAllUsers)
    .post(UserController.createUser)

router.route('/login').post(UserController.login)


module.exports = router