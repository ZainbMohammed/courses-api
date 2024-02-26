let {courses} = require('../data/courses')
const {validationResult} = require('express-validator')
const Course = require('../modules/courses.module');


const getAllCources = async (req,res)=>{
    // get all courses from mongodb using Course model
    const courses = await Course.find();
    res.json(courses);
}

const getSpecificCourse = async (req,res)=>{
    try{
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if(!course){
            res.status(404).json({msg:'Not Found'});
        }
        return res.json(course);
    }catch(error){
        return res.status(400).json({msg:'Invalid object id',...error});
    }
}
const addNewCourse = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse)
    }catch(error){
        return res.status(400).json({msg:'added faield',...error});
    }
}

const updateCourse = async (req,res)=>{
    const courseId = req.params.id;
    try{
        const updatedCourse = await Course.updateOne({_id:courseId},{$set:{...req.body}});
        return res.status(200).json({msg:'updated successfully',...updatedCourse});

    }catch(error){
        return res.status(400).json({msg:'Invalid object id',...error});
    }
}

const deleteCourse = async (req,res)=>{
    const courseId = req.params.id;
    try{
        const course = await Course.deleteOne({_id:courseId});
        res.status(200).json({msg:'deleted successfully',...course});;
    }catch(error){
        return res.status(400).json({msg:'Invalid object id',...error});
    }
}
// ============================

// deal with local api
// const getAllCources = (req,res)=>{
//     res.json(courses);
// }

// const getSpecificCourse = (req,res)=>{
//     const courseId = +req.params.id;
//     const course = courses.find((course)=>course.id == courseId);
//     if(!course){
//         res.status(404).json({msg:'Not Founr'});
//     }
//     res.json(course);
// }

// const addNewCourse = (req,res)=>{

//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json(errors.array());
//     }
//     const course = {
//         id:courses.length+1,
//         ...req.body
//     }
//     courses.push(course)
//     res.status(201).json(course)
// }

// const updateCourse = (req,res)=>{
//     const courseId = +req.params.id;
//     let course = courses.find((course)=>course.id == courseId);
//     if(!course){
//         return res.status(404).json({msg:'Not Founr'});
//     }
//     course = {...course,...req.body}
//     res.status(201).json(course);
// }

// const deleteCourse = (req,res)=>{
//     const courseId = +req.params.id;
//     let course = courses.find((course)=>course.id == courseId);
//     if(!course){
//         return res.status(404).json({msg:'Not Founr'});
//     }
//     courses = courses.filter((course)=>course.id!==courseId);
//     res.status(200).json({msg:' sucessful deleted'});;
// }
//=============================
module.exports ={
    getAllCources,
    getSpecificCourse,
    addNewCourse,
    updateCourse,
    deleteCourse
}