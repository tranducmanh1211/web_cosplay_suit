var express = require('express');
var routes = express.Router();

var tb_categoryCtrl = require('../../controllers/API/Category.Api');

routes.get('/getListCat',tb_categoryCtrl.getCategory);



module.exports = routes;