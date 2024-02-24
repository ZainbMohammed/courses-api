const express = require('express');
const router = express.Router();
const controllers = require('../controllers/courses.controller')
const {body} = require('express-validator')


// Get All Courses
router.get('/',controllers.getAllCources)

// Get specific  Course
router.get('/:id',controllers.getSpecificCourse)

// Add Nwe Course
router.post('/',
[
    body('title')
    .notEmpty()
    .withMessage('title is required')
    .isLength({min:2})
    .withMessage('title at least is 2 digits'),

    body('price')
    .notEmpty()
    .withMessage('price is required')
],
controllers.addNewCourse)

// Update Specific Course
router.patch('/:id',controllers.updateCourse)

// Delete Specific Course
router.delete('/:id',controllers.deleteCourse)



router.route('/')
        .get(controllers.getAllCources)
        .post(
            [
                body('title')
                .notEmpty()
                .withMessage('title is required')
                .isLength({min:2})
                .withMessage('title at least is 2 digits'),
                
                body('price')
                .notEmpty()
                .withMessage('price is required')
            ],
            controllers.addNewCourse
        )


router.route('/:id')
            .get(controllers.getSpecificCourse)
            .patch(controllers.updateCourse)
            .delete(controllers.deleteCourse)


module.exports = router;