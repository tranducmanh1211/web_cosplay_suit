var express = require('express');
var routes = express.Router();
var tb_productCtrl = require('../controllers/API/Product.Api');

routes.get('/getlistsp',tb_productCtrl.getlListSanPham);

routes.put('/updateSP/:id', tb_productCtrl.updateProduct);
routes.delete('/delSP/:id', tb_productCtrl.delProduct); 
routes.post('/addSP',tb_productCtrl.AddProduct);

//lấy danh sách properties
routes.get('/getproperties/:id_product',tb_productCtrl.getproperties);
routes.get('/products/:id',tb_productCtrl.productById);
module.exports = routes;