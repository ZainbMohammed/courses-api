const express = require('express');
const router = express.Router();
const controllers = require('../controllers/courses.controller')
const {validationSchema} = require('../moddlewares/valisationSchemea')
const verifyToken = require('../moddlewares/verifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../moddlewares/allowedTo');

router.route('/')
        .get(controllers.getAllCources)
        .post(verifyToken,validationSchema(),controllers.addNewCourse)

router.route('/:id')
            .get(controllers.getSpecificCourse)
            .patch(verifyToken,controllers.updateCourse)
            .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),controllers.deleteCourse)

module.exports = router;