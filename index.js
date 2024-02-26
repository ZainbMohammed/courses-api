const express = require('express');
const app = express();
const mongoose = require('mongoose');
const coursesRouter = require('./routers/courses.routers')

app.use(express.json())
app.use('/api/courses',coursesRouter)

const mongoAtlasUri =
"mongodb+srv://zainab:1234@mycluster.feybrsm.mongodb.net/codeZone_courses?retryWrites=true&w=majority&appName=myCluster";
const connectDB = async () => {
    try {
      // Connect to the MongoDB cluster
      await mongoose.connect(mongoAtlasUri);
      console.log(" ===Mongoose is connected");
    } catch (e) {
      console.log("could not connect");
    }
}
connectDB();

app.listen(5000,()=>{
    console.log('listing on port 5000');
})