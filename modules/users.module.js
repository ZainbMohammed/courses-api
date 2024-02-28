const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true,
        validate: [validator.isEmail , 'field must be a valid email']
    },
    password:{
        type: String,
        require: true
    },
})
module.exports = mongoose.model('User',userSchema);