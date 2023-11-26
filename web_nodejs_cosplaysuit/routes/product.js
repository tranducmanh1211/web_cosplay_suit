var express = require('express');
var routes = express.Router();
var check_login = require('../middlewares/check_login');
routes.use((req, res, next) => {
    console.log('middleware');
    next();
});

var tb_productCtrl = require('../controllers/product.controller');

routes.get('/getCategory', check_login.yeu_cau_login, tb_productCtrl.gettheloai);

routes.post('/getCategory', check_login.yeu_cau_login, tb_productCtrl.addTL);
// routes.post('/addcategory', tb_productCtrl.AddCategory);

// routes.get('/getProduct/:idTL', tb_productCtrl.editTL);
routes.get('/getProduct', tb_productCtrl.getProduct);

module.exports = routes;