// declaring packages to have them function in server
const express = require('express');
const dotenv = require("dotenv");
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const erroHandler = require('./middleware/error')
// Load env vars 
dotenv.config({path: './config/config.env'});

// connect to DB by calling connect db

connectDB()
// Route files 

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

// starts the app with express
const app = express(); 

// Body parser 
app.use(express.json())


// Dev loggin middleware 
if(process.env.NODE_ENV = 'development'){
    app.use(morgan('dev'))
}
// Mpount routers

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use(erroHandler)

// Port in use
const PORT = process.env.PORT || 5000

// Lis
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // close server 
    server.close(() => process.exit(1));
})