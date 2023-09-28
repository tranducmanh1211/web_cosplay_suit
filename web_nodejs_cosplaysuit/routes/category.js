var express = require('express');
var routes = express.Router();
var tb_productCtrl = require('../controllers/API/Category.Api');
var tb_userCtrl = require('../controllers/API/users.api');




routes.post('/addcategory', tb_productCtrl.AddCategory);




routes.post('/regapp',tb_userCtrl.regApp);
routes.post('/login',tb_userCtrl.login);
routes.get('/login/:email',tb_userCtrl.loginUser);

module.exports = routes;