const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
// @desc    Get request for all bootcamps 
// @route   GET /api/va1/bootcamps
// @access  Public 
exports.getBootcamps = async (req, resp, next) =>{
    try {
        const bootcamps = await Bootcamp.find()

        resp.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
    } catch (error) {
       
        next(error)
    }
}

// @desc    Get request for single bootcamp
// @route   GET /api/va1/bootcamps/:id
// @access  Public 
exports.getBootcamp = async (req, resp, next) =>{
   try {
      const bootcamp = await Bootcamp.findById(req.params.id) 
      if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp Not Found With Id Of ${req.params.id}`, 404))
      }
      resp.status(200).json({success: true, data: bootcamp})
   } catch (error) {
    console.log(error)
      next(error)
   }
}

// @desc    Post request for all bootcamps 
// @route   POST /api/va1/bootcamps
// @access  Private 
exports.createBootcamps = async (req, resp, next) =>{
    try {
        const bootcamp = await Bootcamp.create(req.body)
    
        resp.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update request for one bootcamp 
// @route   UPDATE /api/va1/bootcamps/:id
// @access  Private 
exports.updateBootcamp = async (req, resp, next) =>{
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body, {
            new: true,
            runValidators: true
        })
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp Not Found With Id Of ${req.params.id}`, 404))
        }
        resp.status(200).json({success: true, data: bootcamp})
    } catch (error) {
        next(error)
    }
}
// @desc    delete request for one bootcamp 
// @route   DELETE /api/va1/bootcamps/:id
// @access  Private 
exports.deleteBootcamp = async (req, resp, next) =>{
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp Not Found With Id Of ${req.params.id}`, 404))
        }
        resp.status(200).json({success: true, data: {}})
    } catch (error) {
        next(error)
    }
}

