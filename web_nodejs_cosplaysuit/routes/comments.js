var express = require('express');
var routes = express.Router();
var tb_CmCtrl = require('../controllers/API/Comments.API');

routes.get('/listCmts/:id_pro',tb_CmCtrl.listCmts);

routes.delete('/delCmts/:id',tb_CmCtrl.delCmts);
routes.post('/addCmts',tb_CmCtrl.addCmts);

routes.get('/listCDG/:id_user',tb_CmCtrl.getlistDHCDG);
routes.get('/listDDG/:id_user',tb_CmCtrl.getlistDDG);

routes.get('/listdd/:id_user',tb_CmCtrl.getBillDetailsWithProducts);
module.exports = routes;