const express = require('express')
const {getCourses,createCourses,getCourse} = require('../controllers/courses')
const router = express.Router()

// express route get makes it easier and takes away the use of stringify

router.route('/').get(getCourses).post(createCourses)

router.route('/:id').get(getCourse)


module.exports = router;