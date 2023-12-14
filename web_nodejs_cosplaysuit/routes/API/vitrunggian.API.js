var express = require('express');
var routes = express.Router();

//wallet
var tb_walletCtrl = require('../../controllers/API/vitrunggian.controller.API');

routes.get('/getwallet/:iduser', tb_walletCtrl.getwallet);
routes.post('/addwallet', tb_walletCtrl.AddWallet);

module.exports = routes;