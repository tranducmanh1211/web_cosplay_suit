var express = require('express');
var routes = express.Router();
var tb_vitrunggian = require('../controllers/vitrunggian.controller');
var check_login = require('../middlewares/check_login');
routes.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});
routes.get('/thanhtoantruoc', check_login.yeu_cau_login,tb_vitrunggian.getHome);
routes.get('/thanhtoansau', check_login.yeu_cau_login,tb_vitrunggian.getthanhtoansau);
routes.get('/lichsuthuchien', check_login.yeu_cau_login,tb_vitrunggian.getlichsuthuchien);

module.exports = routes;   