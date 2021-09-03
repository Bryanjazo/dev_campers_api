const express = require('express')
const router = express.Router()

// express route get makes it easier and takes away the use of stringify
router.get('/', (req,resp) => {
    resp.status(200).json({success: true, data: {msg: 'Show all bootcamps', name: {fitbody: 'Bootcamp'}}})
});

router.post('/', (req,resp) => {
    resp.status(200).json({success: true, data: {msg: 'Post all bootcamps', name: {fitbody: 'Bootcamp'}}})
});

router.put('/:id', (req,resp) => {
    resp.status(200).json({success: true, data: {msg: `Update Bootcamp ${req.params.id}`, name: {fitbody: 'Bootcamp'}}})
});

router.delete('/:id', (req,resp) => {
    resp.status(200).json({success: true, data: {msg: `Delete Bootcamp ${req.params.id}`, name: {fitbody: 'Bootcamp'}}})
});

module.exports = router;