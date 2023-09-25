var express = require('express');
var routes = express.Router();
var tb_chuyentranhController = require('../controllers/API/Category.Api');

routes.post('/addcategory', tb_chuyentranhController.AddCategory);

module.exports = routes;