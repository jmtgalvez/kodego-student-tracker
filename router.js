const express = require('express');
const router = express.Router();
const db = require('./routes/database/index');

router.use('/auth', require('./routes/auth/router'));
router.use('/courses', require('./routes/course/router'));
router.use('/students', require('./routes/student/router'));

router.get('/', (req, res) => {res.redirect('/login')});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  let sql = 'SELECT * FROM course'

  db.query(sql, (err, rows) => {
    if (err) console.log(`Database Error! ${err.message}`);
    else res.render('registration', {courses: rows});
  })
});

module.exports = router;