
//app.js

var express = require('express');
var app = express();
//var db = require('./db'); //ADD THIS LINE

var UserController = require('./user/userController');
var orderController = require('./orders/ordersController');
var logisticController = require('./logistics/logisticsController');
app.use('/users', UserController);

app.use('/orders', orderController);

app.use('/logistics',logisticController);

app.use('/',function(req,res){

    res.status(200).send('Welcome');
})
module.exports = app;