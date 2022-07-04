const express = require('express');
const router = express.Router();

const courseController = require('./controller');

router.get('/add', courseController.addCourseForm);

router.post('/add', courseController.addCourse);

module.exports = router;