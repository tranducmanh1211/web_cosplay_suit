var express = require('express');
var router = express.Router();
var tb_userCtrl = require('../controllers/user.controller');

router.get('/',tb_userCtrl.loginWeb);


module.exports = router;
