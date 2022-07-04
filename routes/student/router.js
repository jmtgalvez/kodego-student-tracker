const express = require('express');
const router = express.Router();

const studentController = require('./controller');

router.get('/', studentController.viewAllStudents);

router.get('/add', studentController.addStudentForm);

router.post('/add', studentController.addStudent);

router.get('/delete/:student_id', studentController.deleteStudent);

router.get('/update/:student_id', studentController.updateStudentForm);

router.post('/update/:student_id', studentController.updateStudent);

module.exports = router;