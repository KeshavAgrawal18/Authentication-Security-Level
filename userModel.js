require('dotenv').config()

const mongoose = require("mongoose");
var encrypt = require('mongoose-encryption');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})


// const secret = process.env.SECRET
// // console.log(secret)
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"],});

const User = new mongoose.model('User', userSchema);

module.exports = User;