var express = require('express');
var router = express.Router();
var tb_userCtrl = require('../controllers/user.controller');
var tb_productCtrl = require('../controllers/product.controller');




router.get('/',tb_userCtrl.loginWeb);
router.post('/',tb_userCtrl.loginWeb);
router.get('/signup',tb_userCtrl.dangky);
router.post('/signup',tb_userCtrl.dangky);

router.get('/home',tb_productCtrl.homeWeb);
router.get('/home/quanlykhachhang',tb_productCtrl.quanlyKH);
router.post('/home/quanlykhachhang',tb_productCtrl.quanlyKH)

router.get('/home/quanlykhachhang/:id',tb_productCtrl.deleteKHbyID);
router.delete('/home/quanlykhachhang/:id',tb_productCtrl.deleteKHbyID);
module.exports = router;
