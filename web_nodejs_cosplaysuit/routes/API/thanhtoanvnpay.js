var express = require('express');
var routes = express.Router();
var paymentController = require('../../controllers/thanhtoanvnpay.controller');

routes.post('/create_payment_url', paymentController.payment);
routes.get('/create_payment_url', paymentController.payment);

routes.get('/vnpay_return', paymentController.ex_return);
routes.get('/vnpay_ipn', paymentController.ex_ipn);

routes.get('/vnpay_refund', paymentController.ex_refund);
routes.post('/vnpay_refund', paymentController.ex_refund);

routes.get('/vnpay_querydata', paymentController.ex_querydata);
routes.post('/vnpay_querydata', paymentController.ex_querydata);
module.exports = routes;