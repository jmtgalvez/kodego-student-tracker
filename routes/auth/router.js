const express = require('express');
const router = express.Router();

const authCtrl = require('./controller');

router.post('/login', authCtrl.login);

module.exports = router;