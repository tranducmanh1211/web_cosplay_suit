var express = require('express');
var routes = express.Router();
var tb_productCtrl = require('../controllers/API/Product.Api');

routes.get('/getlistsp', tb_productCtrl.getlListSanPham);
routes.get('/getlistsp/:id_shop', tb_productCtrl.getproductUser);

routes.put('/updateSP/:id', tb_productCtrl.updateProduct);
routes.delete('/delSP/:id', tb_productCtrl.delProduct);
routes.post('/addSP', tb_productCtrl.AddProduct);
// routes.get('/listImage/:id', tb_productCtrl.getlListImage);

//lấy danh sách properties
routes.get('/getproperties/:id_product', tb_productCtrl.getproperties);
routes.get('/products/:id', tb_productCtrl.productById);

// properties
routes.post("/addProperties", tb_productCtrl.AddProperties);
module.exports = routes;