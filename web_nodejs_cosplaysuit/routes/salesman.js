var express = require('express');
var router = express.Router();
var tb_salesmanCtrl = require('../controllers/shop.controller');
var shopController = require('../controllers/shop.controller');
var check_login = require('../middlewares/check_login');
router.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});


router.get('/home',check_login.yeu_cau_login,tb_salesmanCtrl.homeWeb);
router.get('/home/quanlynguoiban',check_login.yeu_cau_login,tb_salesmanCtrl.quanlyNguoiBan);
router.get('/home/quanlynguoiban/:_id',check_login.yeu_cau_login,tb_salesmanCtrl.quanlyNguoiBanbyID);

router.get('/home/getCT/:id_shop',check_login.yeu_cau_login, shopController.getShopProducts);

module.exports = router;