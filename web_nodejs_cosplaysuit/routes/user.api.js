var express = require('express');
var routes = express.Router();
var tb_userCtrl = require('../controllers/API/users.api');






routes.post('/regapp',tb_userCtrl.regApp);
routes.post('/login',tb_userCtrl.login);
routes.get('/login/:email',tb_userCtrl.loginUser);
routes.post('/reg',tb_userCtrl.regApp);
routes.put('/regapp/:id_user',tb_userCtrl.updateRoleUser);
routes.post('/shop/add',tb_userCtrl.regShopApp);

routes.get('/favorite',tb_userCtrl.listFavorite);
routes.post('/favorite',tb_userCtrl.addFavorite);
routes.get('/favorite/:tb_user/:tb_product',tb_userCtrl.listFavorite);
routes.delete('/favorite/:tb_user/:tb_product',tb_userCtrl.removeFavorite);
routes.get('/favorite/:tb_user',tb_userCtrl.listFavorite1);
module.exports = routes;