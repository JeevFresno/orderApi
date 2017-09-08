//ordersController

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended :true}));

var orderFunction = require('../db');



//returning all the orders
router.get('/',orderFunction.allOrdersInDB);


//returns all the orders of the user
router.get('/:userID',orderFunction.allOrdersOfUsers);


//inserting the order of the user
router.post('/:userID/',orderFunction.insertOrderOfUser);


module.exports =router;