var express = require('express');
var routes = express.Router();

var tb_billCtrl = require('../../controllers/API/ThongKe.API');

routes.get('/gettkebill/:id_shop',tb_billCtrl.getBillTke);
module.exports = routes;