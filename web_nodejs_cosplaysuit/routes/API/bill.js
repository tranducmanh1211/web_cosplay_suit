var express = require('express');
var routes = express.Router();

//router giỏ hàng
var tb_cartorderCtrl = require('../../controllers/API/CartOder.API');

routes.get('/getidCartOder/:id',tb_cartorderCtrl.getidCartOder);

routes.get('/getShop/:id_user',tb_cartorderCtrl.getShop);

routes.get('/getShopBuynow/:idcart',tb_cartorderCtrl.getShopBuynow);

routes.get('/getusercartorder/:id_user',tb_cartorderCtrl.getUserCartOder);

routes.post('/addcart',tb_cartorderCtrl.AddCartOder);
routes.post('/checkaddcart/:idcart', tb_cartorderCtrl.CheckAddCart);

routes.put('/updatecart/:id', tb_cartorderCtrl.updateCartOder);

routes.delete('/deletecart/:id', tb_cartorderCtrl.deleteCartOder); 

//router hóa đơn
var tb_billCtrl = require('../../controllers/API/Bill.API');

routes.get('/getuserbill/:id_user',tb_billCtrl.getUserbill);
routes.post('/addbill',tb_billCtrl.AddBill);
routes.put('/upstatusbill/:id',tb_billCtrl.updateBill);
routes.get('/getdskhach/:id',tb_billCtrl.getdskhach);



//router hóa đơn chi tiết
var tb_billdetailCtrl = require('../../controllers/API/Billdetail.API');

routes.get('/getstatuswait/:type/:id',tb_billdetailCtrl.getstatuswait);
routes.get('/getstatusPack/:type/:id',tb_billdetailCtrl.getstatusPack);
routes.get('/getstatusDelivery/:type/:id',tb_billdetailCtrl.getstatusDelivery);
routes.get('/getstatusDone/:type/:id',tb_billdetailCtrl.getstatusDone);

routes.post('/addbilldetail',tb_billdetailCtrl.AddBilldetail);
routes.get('/addbilldetail',tb_billdetailCtrl.AddBilldetail);

module.exports = routes;