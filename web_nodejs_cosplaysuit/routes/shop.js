var express = require('express');
var router = express.Router();
var tb_shop = require('../controllers/API/Shop.Api');


//asdasdas

router.get('/listShop/:id_user', tb_shop.getlListShop);
router.get('/getOneShop/:id', tb_shop.getShopById);

router.get('/getShopById/:id',tb_shop.getShopById1)
router.get('/listShop', tb_shop.getlListShop1);


module.exports = router;