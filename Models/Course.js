const mongoose = require('mongoose');
const slugify = require('slugify')

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a name'],
            unique: true,
            trim: true,
            maxlength: [100, 'Title can not be more than 50 characters']
          },
          description: {
            type: String,
            required: [true, 'Please add a name'],
            unique: true,
            trim: true,
            maxlength: [500, 'Description can not be more than 500 characters']
          },
          weeks: {
            type: Number,
            required: [true, 'Please add a name'],
            unique: true,
            trim: true,
            maxlength: [100, 'Weeks can not be more than 50 characters']
          },
    }
)



module.exports = mongoose.model('Course', CourseSchema);