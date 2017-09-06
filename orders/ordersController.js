//ordersController

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended :true}));

//returning all the orders
router.get('/',function(req,res){
    res.status(200).json({
        status:'200',
        message: 'returning all the orders in the database'
    })
});


//returns all the orders of the user
router.get('/:userID',function(req,res){

    res.status(200).json({
        status:'on its way',
        orderID: req.params.userID,
        message: 'this returns all the orders of the user'
    })
});

//returning the specific order details of the customer

router.get('/:userID/:orderID',function(req,res){

    res.status(200).json({
        userID: req.params.userID,
        orderID: req.params.orderID,
        status: 'waiting',
        message: 'Specific details of the order'
    });
})


module.exports =router;