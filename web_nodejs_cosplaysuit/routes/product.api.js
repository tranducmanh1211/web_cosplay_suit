var express = require('express');
var routes = express.Router();
var tb_productCtrl = require('../controllers/API/Product.Api');

routes.get('/getlistsp',tb_productCtrl.getlListSanPham);


routes.put('/updateSP/:id', tb_productCtrl.updateProduct);

routes.delete('/delSP/:id', tb_productCtrl.delProduct); 
routes.post('/addSP',tb_productCtrl.AddProduct);


module.exports = routes;