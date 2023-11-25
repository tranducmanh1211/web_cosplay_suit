var express = require('express');
var routes = express.Router();
var check_login = require('../middlewares/check_login');
routes.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});

var tb_productCtrl = require('../controllers/category.controller');

routes.get('/getCategory',check_login.yeu_cau_login, tb_productCtrl.gettheloai);

routes.post('/getCategory', check_login.yeu_cau_login,tb_productCtrl.addTL);
// routes.post('/addcategory', tb_productCtrl.AddCategory);
routes.get('/getCategory/delete/:idTL', tb_productCtrl.delTL);
routes.delete('/getCategory/delete/:idTL', tb_productCtrl.delTL);


routes.get('/getCategory/:idTL', tb_productCtrl.editTL);
routes.post('/getCategory/:idTL', tb_productCtrl.editTL);

module.exports = routes;