var express = require('express');
var router = express.Router();
var tb_chat = require('../controllers/API/chat.api');


router.post('/sendMess', tb_chat.SendMess);

module.exports = router;