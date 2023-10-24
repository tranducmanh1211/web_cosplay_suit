var express = require('express');
var routes = express.Router();

//router giỏ hàng
var tb_cartorderCtrl = require('../controllers/API/CartOder.API');

routes.get('/getlistcartorder',tb_cartorderCtrl.getCartOder);

routes.get('/getusercartorder/:id_user',tb_cartorderCtrl.getUserCartOder);

routes.post('/addcart',tb_cartorderCtrl.AddCartOder);

routes.put('/updatecart/:id', tb_cartorderCtrl.updateCartOder);

routes.delete('/deletecart/:id', tb_cartorderCtrl.deleteCartOder); 

//router thanh toán hóa đơn
var tb_billCtrl = require('../controllers/API/Bill.API');

routes.get('/getuserbill/:id_user',tb_billCtrl.getUserbill);
routes.post('/addbill',tb_billCtrl.AddBill);

//router thanh toán hóa đơn chi tiết
var tb_billdetailCtrl = require('../controllers/API/Billdetail.API');

routes.get('/getbilldentail/:id_bill',tb_billdetailCtrl.getbilldentail);
routes.post('/addbilldetail',tb_billdetailCtrl.AddBilldetail);

module.exports = routes;