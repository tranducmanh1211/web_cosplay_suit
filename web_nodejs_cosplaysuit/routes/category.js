var express = require('express');
var routes = express.Router();
// var tb_productCtrl = require('../controllers/API/Category.Api');
var tb_userCtrl = require('../controllers/API/users.api');
var tb_productCtrl = require('../controllers/API/Category.Api');

routes.get('/getCategory', tb_productCtrl.getCategory);

// routes.post('/addcategory', tb_productCtrl.AddCategory);




module.exports = routes;