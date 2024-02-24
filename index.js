const express = require('express');
const app = express();
const coursesRouter = require('./routers/courses.routers')

app.use(express.json())
app.use('/api/courses',coursesRouter)

app.listen(5000,()=>{
    console.log('listing on port 5000');
})