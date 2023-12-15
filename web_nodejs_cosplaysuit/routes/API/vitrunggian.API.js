var express = require('express');
var routes = express.Router();

//wallet
var tb_walletCtrl = require('../../controllers/API/vitrunggian.controller.API');

routes.get('/getwallet/:iduser', tb_walletCtrl.getwallet);
routes.post('/addwallet', tb_walletCtrl.AddWallet);
routes.put('/upwalletAdmin', tb_walletCtrl.UpWalletAdmin);
routes.get('/lichsuthuchien/:id_user', tb_walletCtrl.Getlichsuthuchien);

module.exports = routes;