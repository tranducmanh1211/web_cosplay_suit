var express = require('express');
var routes = express.Router();
var tb_userCtrl = require('../controllers/API/users.api');




routes.post('/otp',tb_userCtrl.seenOTP);
routes.put('/doimk/:id',tb_userCtrl.updatePasswd);
routes.put('/fPasswd/:phone',tb_userCtrl.forgotPasswd);
routes.post('/regapp',tb_userCtrl.regApp);
routes.post('/login',tb_userCtrl.login);
routes.get('/login/:email',tb_userCtrl.loginUser);
routes.post('/reg',tb_userCtrl.regApp);
routes.put('/regapp/:id_user',tb_userCtrl.updateRoleUser);
routes.post('/shop/add',tb_userCtrl.regShopApp);

routes.get('/fUser/:id',tb_userCtrl.userById);

routes.get('/profile/:id',tb_userCtrl.diachiById);
routes.put('/uprofile/:id',tb_userCtrl.updatediachi);
routes.post('/postprofile',tb_userCtrl.updiachi);



module.exports = routes;