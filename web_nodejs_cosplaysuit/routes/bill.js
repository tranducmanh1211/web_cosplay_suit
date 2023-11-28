var express = require('express');
var routes = express.Router();
var check_login = require('../middlewares/check_login');
routes.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});

var tb_bill = require('../controllers/bill.controller');

routes.get('/getbilldone',check_login.yeu_cau_login, tb_bill.getBillDone);


module.exports = routes;