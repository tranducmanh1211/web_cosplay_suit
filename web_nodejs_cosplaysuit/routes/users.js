var express = require('express');
var router = express.Router();
var tb_userCtrl = require('../controllers/user.controller');
var tb_productCtrl = require('../controllers/product.controller');
var check_login = require('../middlewares/check_login');
router.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});



router.get('/',tb_userCtrl.loginWeb);
router.post('/',tb_userCtrl.loginWeb);
router.get('/signup',tb_userCtrl.dangky);
router.post('/signup',tb_userCtrl.dangky);

router.get('/home',check_login.yeu_cau_login,tb_productCtrl.homeWeb);
router.get('/home/quanlykhachhang',check_login.yeu_cau_login,tb_productCtrl.quanlyKH);
router.post('/home/quanlykhachhang',check_login.yeu_cau_login,tb_productCtrl.quanlyKH)

router.get('/home/quanlykhachhang/:id',check_login.yeu_cau_login,tb_productCtrl.deleteKHbyID);
router.delete('/home/quanlykhachhang/:id',check_login.yeu_cau_login,tb_productCtrl.deleteKHbyID);
module.exports = router;
