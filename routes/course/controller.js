const db = require('../database/index');

exports.addCourseForm = (req, res) => {
  let sql = 'SELECT * FROM course'

  db.query( sql, (err, rows) => {
    if (err) console.log(err.message);
    else {
      
      res.render('addCourse', {courses: rows});
    }
  
  })
}

exports.addCourse = (req, res) => {
  const {course_name, course_description, course_name_text} = req.body;
  if (!course_name || !course_description || (course_name == "Others" && !course_name_text))
    return res.render('addCourse', {message: 'Please select course title and course description.'});
  else {
    let sql = `INSERT INTO course
    (course_name, course_description)
    VALUES (?, ?)`;
    let values = [
      course_name == "Others" ? course_name_text : course_name,
      course_description
    ];
    
    db.query(sql, values, (err, rows) => {
      if (err) console.log(`Database Error! (routes/index.js POST /course) ${err.message}`);
      else return res.redirect('/students');
    });
  }
}

// exports.getAllCourses = (req, res) => {
//   let sql = `SELECT * FROM courses`;

//   db.query( sql, (err, rows) => {
//     if (err) 
//       console.log(`Database Error! (routes/course/controller.js) ${err.message}`);
//     else {
//       return JSON.stringify(rows);
//     }
//   });
// }