var express = require('express');
var router = express.Router();
var tb_shop = require('../controllers/API/Shop.Api');
var shopController = require('../controllers/shop.controller');
var check_login = require('../middlewares/check_login');
router.use((req, res, next) => {
    console.log('middleware');
    next();
});
//asdasdas

router.get('/listShop/:id_user',check_login.yeu_cau_login, tb_shop.getlListShop);
router.get('/getOneShop/:id',check_login.yeu_cau_login, tb_shop.getShopById);

router.get('/getShopById/:id',check_login.yeu_cau_login,tb_shop.getShopById1)
router.get('/listShop',check_login.yeu_cau_login, tb_shop.getlListShop1);

router.get('/getCT/:id_shop',check_login.yeu_cau_login, shopController.getShopProducts);

module.exports = router;