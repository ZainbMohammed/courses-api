const {validationResult} = require('express-validator')
const Course = require('../modules/courses.module');
const httpStatusText = require('../utils/httpStatusText')

// find({queryFilter},{projection})
const getAllCources = async (req,res)=>{
    // get all courses from mongodb using Course model
    const courses = await Course.find({},{"__v":false});
    res.json({status: httpStatusText.SUCCESS ,data: {courses}});
}

const getSpecificCourse = async (req,res)=>{
    try{
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if(!course){
            res.status(404).json({status: httpStatusText.FAIL ,Message: 'course not found'});
        }
        return res.json({status: httpStatusText.SUCCESS ,data: {course}});
    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR ,Message: error.Message});
    }
}

const addNewCourse = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({status: httpStatusText.FAIL,data: errors.array()});
    }
    try{
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({status: httpStatusText.SUCCESS,data: {course:newCourse}})
    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}

const updateCourse = async (req,res)=>{
    const courseId = req.params.id;
    try{
        const updatedCourse = await Course.updateOne({_id: courseId}, {$set: {...req.body}});
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {course:updatedCourse}});

    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}

const deleteCourse = async (req,res)=>{
    const courseId = req.params.id;
    try{
        const course = await Course.deleteOne({_id:courseId});
        res.status(200).json({status: httpStatusText.SUCCESS ,...course});;
    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}

module.exports ={
    getAllCources,
    getSpecificCourse,
    addNewCourse,
    updateCourse,
    deleteCourse
}