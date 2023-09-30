var express = require('express');
var routes = express.Router();
var tb_userCtrl = require('../controllers/API/users.api');






routes.post('/regapp',tb_userCtrl.regApp);
routes.post('/login',tb_userCtrl.login);
routes.get('/login/:email',tb_userCtrl.loginUser);
routes.post('/reg',tb_userCtrl.regApp);

module.exports = routes;