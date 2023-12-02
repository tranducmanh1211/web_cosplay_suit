var express = require('express');
var routes = express.Router();
var tb_productCtrl = require('../controllers/API/Product.Api');
var tb_CategoryCtrl = require('../controllers/API/Category.Api');

routes.get('/getlistsp', tb_productCtrl.getlListSanPham);
routes.get('/getlistsp/:id_shop', tb_productCtrl.getproductUser);
routes.get('/getlistsplimit/:id_shop', tb_productCtrl.getproductByIdShop);
routes.get('/getlistsp/:id_shop/:page', tb_productCtrl.getproductByIdShopPage);
routes.put('/updateSP/:id', tb_productCtrl.updateProduct);
routes.delete('/delSP/:id', tb_productCtrl.delProduct);
routes.post('/addSP', tb_productCtrl.AddProduct);
// routes.get('/listImage/:id', tb_productCtrl.getlListImage);
routes.get('/getlistsptrending', tb_productCtrl.getproductTreding);
routes.get('/getlistsptrending/:id_shop', tb_productCtrl.getproductByIdShopTreding);

routes.get('/getlistprobyidcat/:id_category', tb_productCtrl.getListProByIdCat);
//lấy danh sách properties
routes.get('/getproperties/:id_product', tb_productCtrl.getproperties);
routes.get('/products/:id', tb_productCtrl.productById);
//
routes.get('/getCategoryApp', tb_CategoryCtrl.getCategory);
routes.get('/searchProduct/:id_shop', tb_productCtrl.SearchproductUser);
routes.get('/getproductCategory/:id_shop/:id_category', tb_productCtrl.getproductCategory);




// properties
routes.post("/addProperties", tb_productCtrl.AddProperties);

module.exports = routes;