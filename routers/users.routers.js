const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.controller')
const {validationSchema} = require('../moddlewares/valisationSchemea')
const {body} = require('express-validator')


// get all users

// register 

// login
router.route('/')
        .get(userControllers.getAllUsers)
        
router.route('/register')
        .post(userControllers.register)
       
router.route('/login')
        .post(userControllers.login)
        
module.exports = router;