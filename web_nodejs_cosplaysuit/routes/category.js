var express = require('express');
var routes = express.Router();

var tb_productCtrl = require('../controllers/category.controller');

routes.get('/getCategory', tb_productCtrl.gettheloai);

// routes.post('/addcategory', tb_productCtrl.AddCategory);

module.exports = routes;