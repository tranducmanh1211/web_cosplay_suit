var express = require('express');
var routes = express.Router();
var tb_productCtrl = require('../controllers/API/Product.Api');

routes.get('/getlistsp',tb_productCtrl.getlListSanPham);


module.exports = routes;