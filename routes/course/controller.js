const db = require('../database/index');

exports.addCourseForm = (req, res) => {
  res.render('addCourse');
}

exports.addCourse = (req, res) => {
  const {course_name, course_description} = req.body;
  if (!course_name || !course_description)
    return res.render('addCourse', {message: 'Please select course title and course description.'});
  else {
    let sql = `INSERT INTO course
    (course_name, course_description)
    VALUES (?, ?)`;
    let values = [
      course_name,
      course_description
    ];
    
    db.query(sql, values, (err, rows) => {
      if (err) console.log(`Database Error! (routes/index.js POST /course) ${err.message}`);
      else return res.redirect('/students');
    });
  }
}