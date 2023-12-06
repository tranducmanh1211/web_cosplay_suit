var express = require('express');
var routes = express.Router();
var tb_VcCtrl = require('../controllers/API/Voucher.api');


routes.get('/voucher/:id',tb_VcCtrl.getListVoucher);
routes.put('/upvoucher/:id',tb_VcCtrl.updateProduct);
routes.post('/postvoucher',tb_VcCtrl.AddVoucher);
routes.delete('/delvoucher/:id',tb_VcCtrl.delVoucher);
routes.get('/getdskhachvoucher/:id',tb_VcCtrl.listUserByShop);
routes.post('/seenvoucher',tb_VcCtrl.seenVoucher);
routes.put('/updatevoucherSeen/:id',tb_VcCtrl.updateVoucherSeen);
routes.get('/listvoucher/:id_voucher',tb_VcCtrl.listSeenByIdVoucher);
module.exports = routes;