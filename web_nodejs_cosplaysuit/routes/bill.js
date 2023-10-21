var express = require('express');
var routes = express.Router();

//router giỏ hàng
var tb_cartorderCtrl = require('../controllers/API/CartOder.API');

routes.get('/getlistcartorder',tb_cartorderCtrl.getCartOder);

routes.post('/addcart',tb_cartorderCtrl.AddCartOder);

routes.put('/updatecart/:id', tb_cartorderCtrl.updateCartOder);

routes.delete('/deletecart/:id', tb_cartorderCtrl.deleteCartOder); 

//router thanh toán hóa đơn

module.exports = routes;