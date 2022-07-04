const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const router = require('./router');

const port = 3000;
const app = express();

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} ...`);
});