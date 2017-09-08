
//app.js, handles all the routes of the api

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
    res.status(200).json({
        status:200,
        message: 'api is active and functional, thanks for visiting.'
    });
});


//catching all the unrouted routes
app.all('*', function(req, res) {
    throw new Error("Bad request")
});

//error handling middleware
app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).json({error: {msg: e.message, stack: e.stack}});
    }
});
module.exports = app;