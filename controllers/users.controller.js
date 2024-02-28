const User = require('../modules/users.module');
const httpStatusText = require('../utils/httpStatusText')
const bcrypt = require("bcryptjs")

const getAllUsers = async (req,res)=>{
    // get all courses from mongodb using Course model
    const users = await User.find({},{"__v":false});
    res.json({status: httpStatusText.SUCCESS ,data: {users}});
}


const register = async(req,res)=>{
    // console.log(req.body);
    try{
        const {firstName, lastName, email, password} = req.body;
        const oldUser = await User.findOne({email:email});

        if(oldUser){
            return res.status(400).json({status: httpStatusText.FAIL,Message: "User is alerady exit"});
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        return res.status(201).json({status: httpStatusText.SUCCESS,data: {course:newUser}})

    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}


const login = async (req,res)=>{
    
    const {email,password} = req.body;
    if(!email && !password){
        return res.status(400).json({status: httpStatusText.ERROR, Message: "email and password are require"});
    }

}

module.exports = {
    getAllUsers,
    register,
    login
}