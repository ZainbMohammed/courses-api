let {courses} = require('../data/courses')
const {validationResult} = require('express-validator')

const getAllCources = (req,res)=>{
    res.json(courses);
}

const getSpecificCourse = (req,res)=>{
    const courseId = +req.params.id;
    const course = courses.find((course)=>course.id == courseId);
    if(!course){
        res.status(404).json({msg:'Not Founr'});
    }
    res.json(course);
}

const addNewCourse = (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const course = {
        id:courses.length+1,
        ...req.body
    }
    courses.push(course)
    res.status(201).json(course)
}

const updateCourse = (req,res)=>{
    const courseId = +req.params.id;
    let course = courses.find((course)=>course.id == courseId);
    if(!course){
        return res.status(404).json({msg:'Not Founr'});
    }
    course = {...course,...req.body}
    res.status(201).json(course);
}

const deleteCourse = (req,res)=>{
    const courseId = +req.params.id;
    let course = courses.find((course)=>course.id == courseId);
    if(!course){
        return res.status(404).json({msg:'Not Founr'});
    }
    courses = courses.filter((course)=>course.id!==courseId);
    res.status(200).json({msg:' sucessful deleted'});;
}

module.exports ={
    getAllCources,
    getSpecificCourse,
    addNewCourse,
    updateCourse,
    deleteCourse
}