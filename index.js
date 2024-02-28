require('dotenv').config();
const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const coursesRouter = require('./routers/courses.routers');
const usersRouter = require('./routers/users.routers');
const httpStatusText = require('./utils/httpStatusText');
app.use(cors()); // to solve cors policy 'Cross Origin Resourse Sharing'
app.use(express.json());
app.use('/api/courses',coursesRouter);
app.use('/api/users',usersRouter);


const connectDB = async () => {
    try {
      // Connect to the MongoDB cluster
      await mongoose.connect(process.env.mongoAtlasUri);
      console.log(" ===Mongoose is connected");
    } catch (e) {
      console.log("could not connect");
    }
}
connectDB();

// gloable middleware for not found router 
app.all('*',(req,res,next)=>{
  return res.json({status:httpStatusText.ERROR,Message:'This resourse is not available'});
})
app.listen(5000,()=>{
    console.log('listing on port 5000');
})