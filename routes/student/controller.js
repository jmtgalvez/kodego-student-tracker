const db = require('../database/index');
const url = require('url');

exports.viewAllStudents = (req, res) => {
  let info = req.query.info;
  let remove = req.query.remove;
  let sql = 'SELECT * FROM student a JOIN course b ON a.course_id = b.course_id';

  db.query(sql, (err, rows) => {
    if (err)
      console.log(`Database Error! (routes/index.js GET /students) ${err.message}`);
    if (rows.length > 0)
      return res.render('listStudents', {students: rows, info: info, remove: remove});
    else {
      res.render('listStudents', {message: 'No current students.'});
    }
  });



  
  // let info = req.query.info;
  // let remove = req.query.remove;
  // let sql = `SELECT * FROM
  // (student a
  // JOIN course b
  // ON a.course_id = b.course_id)
  // JOIN user c
  // ON a.user_id = c.user_id`;

  // db.query(sql, (err, rows) => {
  //   if (err)
  //    console.log(`Database Error! (routes/index.js GET /students) ${err.message}`);
  //   if (rows.length > 0) {
  //     return res.render('listStudents', {students: rows, info: info, remove: remove});
  //   }
  //   else {
  //     res.render('listStudents', {message: 'No current students.'});
  //   }
  // });
}

exports.addStudentForm = (req, res) => {
  let sql = 'SELECT * FROM course'

  db.query( sql, (err, rows) => {
    if (err) 
      console.log(`Database Error! (routes/student/controller.js GET /student) ${err.message}`);
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
    if (err)
      console.log(`Database Error! (routes/student/controller.js POST /students/add) ${err.message}`);
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
  });



  


  // const {first_name, last_name, email, course_id} = req.body;
  // let sql = `INSERT INTO user
  // (
  //   username, 
  //   password, 
  //   first_name, 
  //   last_name, 
  //   email
  // ) VALUES ( ?, ?, ?, ?, ?)`;

  // let values = [
  //   // username,
  //   // password,
  //   first_name,
  //   last_name,
  //   email
  // ]

  // db.query( sql, values, (err, rows) => {
  //   if (err) console.log(`Database Error! (routes/student/controller.sj POST /students/add) ${err.message}`);
  //   else {
  //     let user_id = rows.insertId;
  //     sql = `INSERT INTO student
  //     (
  //       user_id = ?,
  //       course_id = ?
  //     )`;
  //     values = [
  //       user_id,
  //       course_id
  //     ]

  //     db.query(sql, values, (err, rows) => {
  //       if (err) console.log(`Database Error! (routes/student/controller.sj POST /students/add) ${err.message}`);
  //       else {
  //         return res.redirect(
  //           url.format({
  //             pathname: '/students',
  //             query: {
  //               info: 'Successfully added student.'
  //             }
  //           })
  //         )
  //       }
  //     });
  //   }
  // });
}

exports.deleteStudent = (req, res) => {
  const student_id = req.params.student_id;

  let sql = `DELETE FROM student WHERE student_id = ?`

  db.query(sql, student_id, (err, rows) => {
    if (err)
      console.log(`Database Error! (routes/student/controller.js POST /delete/:id) ${err.message}`);
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






  // const student_id = req.params.student_id;
  
  // let sql = `SELECT * FROM student WHERE student_id = ?`

  // db.query(sql, student_id, (err, rows) => {
  //   if (err) console.log(`Database Error! (routes/student/controller.js POST /delete/:id) ${err.message}`);
  //   else {
  //     let user_id = rows[0].user_id;

  //     sql = `DELETE FROM student WHERE student_id = ?`;

  //     db.query(sql, student_id, (err, rows) => {
  //       if (err) console.log(`Database Error! (routes/student/controller.js POST /delete/:id) ${err.message}`);
  //       else {
  //         sql = `DELETE FROM user WHERE user_id = ?`;

  //         db.query(sql, user_id, (err, rows) => {
  //           if (err) console.log(`Database Error! (routes/student/controller.js POST /delete/:id) ${err.message}`);
  //           else {
  //             res.redirect( 
  //               url.format({
  //                 pathname: '/students',
  //                 query: {
  //                   remove: 'Remove student success.'
  //                 }
  //               })
  //             );
  //           }
  //         });
  //       }
  //     });
  //   }
  // });
}

exports.updateStudentForm = (req, res) => {
  const student_id = req.params.student_id;

  let sql = 'SELECT * FROM student a JOIN course b ON a.course_id = b.course_id WHERE a.student_id = ?'

  db.query(sql, student_id, (err, rows) => {
    if (err)
      console.log(`Database Error! (routes/student/controller.js GET /update/delete/:id) ${err.message}`);
    else {
      let student = rows[0];
      let sql = 'SELECT * FROM course WHERE course_id != ?';

      db.query(sql, student.course_id, (err, rows) => {
        if (err)
          console.log(`Database Error! (routes/student/controller.js GET /update/delete/:id) ${err.message}`);
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
    if (err)
      console.log(`Database Error! (routes/student/controller.js POST /update/delete/:id) ${err.message}`);
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





  // const student_id = req.params.student_id;
  // const {first_name, last_name, email, course_id} = req.body;

  // let sql = `SELECT * FROM student WHERE student_id = ?`;

  // db.query(sql, student_id, (err, rows) => {
  //   if (err) console.log(`Database Error! (routes/student/controller.js POST /update/delete/:id) ${err.message}`);
  //   else {

  //     if (rows[0].course_id != course_id) {
  //       sql = `UPDATE student SET
  //       course_id = ?
  //       WHERE student_id = ?`;

  //       let values = [
  //         course_id,
  //         student_id
  //       ]

  //       db.query(sql, values, (err, rows) => {
  //         if (err) console.log(`Database Error! (routes/student/controller.js POST /update/delete/:id) ${err.message}`);
  //         else console.log(`Successfully updated ${first_name} ${last_name}'s course.`);
  //       });
  //     }

  //     if (rows[0].first_name != first_name || rows[0].last_name != last_name || rows[0].email != email) {
  //       const user_id = rows[0].user_id;

  //       sql = ` UPDATE user SET
  //       first_name = ?,
  //       last_name = ?,
  //       email = ?
  //       WHERE user_id = ?`;

  //       let values = [
  //         first_name,
  //         last_name,
  //         email,
  //         user_id
  //       ];
        
  //       db.query( sql, values, (err, rows) => {
  //         if (err) console.log(`Database Error! (routes/student/controller.js POST /update/delete/:id) ${err.message}`);
  //         else console.log(`Successfully updated ${first_name} ${last_name}'s profile.`);
  //       });
  //     }

  //     res.redirect(
  //       url.format({
  //         pathname: '/students',
  //         query: {
  //           info: `Successfully edited student ${first_name} ${last_name}.`,
  //         }
  //       })
  //     );
  //   }
  // });
}