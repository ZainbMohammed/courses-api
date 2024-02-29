const mongoose = require('mongoose');
const validator = require('validator');
const userRole = require('../utils/userRoles');
const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        require : true
    },
    lastName: {
        type : String,
        require : true
    },
    email: {
        type : String,
        unique : true,
        require : true,
        validate : [validator.isEmail , 'field must be a valid email']
    },
    password: {
        type : String,
        require : true
    },
    token: {
        type : String
    },
    role: {
        type : String,
        enum : [userRole.ADMIN,userRole.USER,userRole.MANAGER],
        default : userRole.USER 
    }
})

module.exports = mongoose.model('User',userSchema);