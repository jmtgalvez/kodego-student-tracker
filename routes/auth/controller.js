const db = require('../database/index');

exports.login = (req, res) => {
  const { username, password } = req.body;

  let sql = 'SELECT * FROM user WHERE username = ?';
  
  db.query(sql, username, (err, rows) => {
    if (err) 
      console.log(`Database Error! ${err.message}`);
    else if (rows[0].password !== password)
      return res.status(401).render('login', {message: 'Please enter valid username and password.'});
    else {
      // const user_id = rows[0].user_id;
      // sql = `SELECT * FROM admin WHERE user_id = ?`;

      // db.query( sql, user_id, (err,rows) => {
      //   if (err) 
      //     console.log(`Database Error! ${err.message}`);
      //   else if (rows[0].length == 0)     
      //       return res.redirect('/students')
      //   else {
      
      //   }
      // });

      res.redirect('/students');
    }
  })
}