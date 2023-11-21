var express = require('express');
var router = express.Router();
var tb_salesmanCtrl = require('../controllers/shop.controller');

router.get('/home',tb_salesmanCtrl.homeWeb);
router.get('/home/quanlynguoiban',tb_salesmanCtrl.quanlyNguoiBan);
router.get('/home/quanlynguoiban/:_id',tb_salesmanCtrl.quanlyNguoiBanbyID);

module.exports = router;