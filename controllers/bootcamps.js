const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')
const asyncHandler = require('../middleware/async')
// @desc    Get request for all bootcamps 
// @route   GET /api/va1/bootcamps
// @access  Public 
exports.getBootcamps = asyncHandler(async(req, resp, next) =>{
        let query;

        // Copy req.query create a query string
        const reqQuery = {...req.query}


        // fields to exclude 
        const removeFields = ['select', 'sort']

        // loop over removed fields and d them from req.query
        
        removeFields.forEach(param => delete reqQuery[param])


        console.log(reqQuery)

        let queryString = JSON.stringify(reqQuery)



        // create operators to classify less than equal to or greater than
        queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        query = Bootcamp.find(JSON.parse(queryString))

        // Select fields 
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ')
            console.log(fields)
            query = query.select(fields)
        }

        // sort 

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else{
            query = query.sort('-createdAt')
        }

        const bootcamps = await query

        resp.status(200).json({success: true, count: bootcamps.length, data: bootcamps})

})

// @desc    Get request for single bootcamp
// @route   GET /api/va1/bootcamps/:id
// @access  Public 
exports.getBootcamp = asyncHandler(async(req, resp, next) =>{

      const bootcamp = await Bootcamp.findById(req.params.id) 
      if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp Not Found With Id Of ${req.params.id}`, 404))
      }
      resp.status(200).json({success: true, data: bootcamp})
  
})

// @desc    Post request for all bootcamps 
// @route   POST /api/va1/bootcamps
// @access  Private 
exports.createBootcamps = asyncHandler (async(req, resp, next) =>{
  
        const bootcamp = await Bootcamp.create(req.body)
    
        resp.status(201).json({
            success: true,
            data: bootcamp
        })
  
})

// @desc    Update request for one bootcamp 
// @route   UPDATE /api/va1/bootcamps/:id
// @access  Private 
exports.updateBootcamp = asyncHandler (async (req, resp, next) =>{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body, {
            new: true,
            runValidators: true
        })
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp Not Found With Id Of ${req.params.id}`, 404))
        }
        resp.status(200).json({success: true, data: bootcamp})
  
})
// @desc    delete request for one bootcamp 
// @route   DELETE /api/va1/bootcamps/:id
// @access  Private 
exports.deleteBootcamp = asyncHandler (async (req, resp, next) =>{

        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp Not Found With Id Of ${req.params.id}`, 404))
        }
        resp.status(200).json({success: true, data: {}})
})


// @desc    Get bootcamps within a radious 
// @route   GET /api/va1/bootcamps/radius/:zipcode/:distance 
// @access  provate
exports.getBootcampsInRadius = asyncHandler(async(req, resp, next) =>{
    const {zipcode, distance} = req.params;
    
    // get latitude and longitude from geocoder
    const loc =  await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude 
    
    
    // calc radius 
    // divide distance by the radius of the earth 
    // Earth Radius = 3,963 mi/ 6,378 km
    
    const radius = distance / 3963
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: {$centerSphere: [ [lng,lat], radius]}}
    })
    resp.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})