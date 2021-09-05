const errorHandler = (err,req,res,next) => {
    console.log(err.stack.red)
    console.log(`second`.blue.bold)

    res.status(err.statusCode || 500).json({success: false, error: err.message || "Server Error"})
}

module.exports = errorHandler;