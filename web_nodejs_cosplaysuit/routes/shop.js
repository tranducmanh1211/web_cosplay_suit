var express = require('express');
var router = express.Router();
var tb_shop = require('../controllers/API/Shop.Api');
//asdasdas

router.get('/listShop', tb_shop.getlListShop);
router.get('/getOneShop/:id', tb_shop.getShopById );



module.exports = router;