require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const coursesRouter = require('./routers/courses.routers')

app.use(express.json())
app.use('/api/courses',coursesRouter)


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
app.listen(5000,()=>{
    console.log('listing on port 5000');
})