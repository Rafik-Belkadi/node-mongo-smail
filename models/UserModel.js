const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    age: Number,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const UserModel = mongoose.model('users', UserSchema)


module.exports = UserModel