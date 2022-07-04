const db = require('../database/index');

exports.login = (req, res) => {
  const { username, password } = req.body;

  let sql = 'SELECT * FROM user WHERE username = ?';
  
  db.query(sql, username, (err, rows) => {
    if (err)
      console.log(`Database Error! ${err.message}`);
    else if (rows[0].password !== password)
      return res.render('login', {message: 'Please enter valid username and password.'});
    else 
      res.redirect('/students');
  })
}