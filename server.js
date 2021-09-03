// declaring packages to have them function in server
const express = require('express');
const dotenv = require("dotenv");
// Route files 

const bootcamps = require('./routes/bootcamps')
// Load env vars 
dotenv.config({path: './config/config.env'});

// starts the app with express
const app = express(); 

// Mpount routers

app.use('/api/v1/bootcamps', bootcamps)

// Port in use
const PORT = process.env.PORT || 5000

// Lis
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
