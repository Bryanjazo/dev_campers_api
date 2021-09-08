const Course = require('../models/Course')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')


// @desc    Get request for all bootcamps 
// @route   GET /api/va1/bootcamps
// @access  Public 
exports.getCourses = asyncHandler(async(req, resp, next) =>{
    const courses = await Course.find()
    resp.status(200).json({success: true, count: courses.length, data: courses})

})

exports.getCourse = asyncHandler(async(req, resp, next) =>{
    const courses = await Course.findById(req.params.id)
    resp.status(200).json({success: true, count: courses.length, data: courses})

})

exports.createCourses = asyncHandler(async(req, resp, next) =>{
    const courses = await Course.create(req.body)

    resp.status(201).json({
        success: true,
        data: courses
    })
    
})