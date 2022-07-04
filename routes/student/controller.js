const db = require('../database/index');
const url = require('url');

exports.viewAllStudents = (req, res) => {
  let info = req.query.info;
  let remove = req.query.remove;
  let sql = 'SELECT * FROM student a JOIN course b ON a.course_id = b.course_id';

  db.query(sql, (err, rows) => {
    if (err) console.log(`Database Error! (routes/index.js GET /students) ${err.message}`);
    if (rows.length > 0) {
      return res.render('listStudents', {students: rows, info: info, remove: remove, display: true});
    }
    else {
      res.render('listStudents', {message: 'No current students.'});
    }
  });
}

exports.addStudentForm = (req, res) => {
  let sql = 'SELECT * FROM course'

  db.query( sql, (err, rows) => {
    if (err) console.log(`Database Error! (routes/student/controller.js GET /student) ${err.message}`);
    else {
      res.render('addStudent', {courses: rows, add: true});
    }
  });
}

exports.addStudent = (req, res) => {
  const {first_name, last_name, email, course_id} = req.body;

  let sql = `INSERT INTO student
  (first_name, last_name, email, course_id)
  VALUES ( ?, ?, ?, ?)`;

  let values = [
   first_name,
   last_name,
   email,
   course_id
  ];

  db.query(sql, values, (err, rows) => {
    if (err) console.log(`Database Error! (routes/student/controller.js POST /student) ${err.message}`);
    else {
      return res.redirect(
        url.format({
          pathname: '/students',
          query: {
            info: 'Successfully added student.'
          }
        })
      )
    }
  })
}

exports.deleteStudent = (req, res) => {
  const student_id = req.params.student_id;

  let sql = `DELETE FROM student WHERE student_id = ?`

  db.query(sql, student_id, (err, rows) => {
    if (err) console.log(`Database Error! (routes/student/controller.js POST /delete/:id) ${err.message}`);
    else {
      res.redirect( 
        url.format({
          pathname: '/students',
          query: {
            remove: 'Remove student success.'
          }
        })
      );
    }
  });
}

exports.updateStudentForm = (req, res) => {
  const student_id = req.params.student_id;

  let sql = 'SELECT * FROM student a JOIN course b ON a.course_id = b.course_id WHERE a.student_id = ?'

  db.query(sql, student_id, (err, rows) => {
    if (err) console.log(`Database Error! (routes/student/controller.js GET /update/delete/:id) ${err.message}`);
    else {
      let student = rows[0];
      let sql = 'SELECT * FROM course WHERE course_id != ?';

      db.query(sql, student.course_id, (err, rows) => {
        if (err) console.log(`Database Error! (routes/student/controller.js GET /update/delete/:id) ${err.message}`);
        else {
          res.render('addStudent', {student: student, courses: rows});
        }
      });
    }
  })
}

exports.updateStudent = (req, res) => {
  const student_id = req.params.student_id;
  const {first_name, last_name, email, course_id} = req.body;

  let sql = `UPDATE student SET
  first_name = ?,
  last_name = ?,
  email = ?,
  course_id = ?
  WHERE student_id = ?`;
  let values = [
    first_name,
    last_name,
    email,
    course_id,
    student_id
  ];
  db.query(sql, values, (err, rows) => {
    if (err) console.log(`Database Error! (routes/student/controller.js POST /update/delete/:id) ${err.message}`);
    else {
      res.redirect(
        url.format({
          pathname: '/students',
          query: {
            info: `Successfully edited student ${first_name} ${last_name}.`,
          }
        })
      )
    }
  });
}