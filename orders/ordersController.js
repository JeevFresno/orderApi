//ordersController

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended :true}));

var orderFunction = require('../db');
//var cl = require('../populateDB');
//returning all the orders
router.get('/',function(req,res){
    res.status(200).json({
        status:'200',
        message: 'returning all the orders in the database'
    })
});


//returns all the orders of the user
router.get('/:userID',orderFunction.allOrdersOfUsers);

//returning the specific order details of the customer
router.get('/:userID/:orderID',orderFunction.allOrdersOfUsers);


//inserting the order of the user
router.post('/:userID/',orderFunction.insertOrderOfUser);

/*router.post('/:userID/',function(req,res){

    console.log(req.params.userID);
    var item = req.body.products;
    console.log(item);
    var items =item.split(",");
    console.log(items);
    var query = "select category.id as ID, category.categoryName as Category_Name from category where category.id = ANY (select category_id from productcategories where product_id = (SELECT id as pID from product where productName=$1)) LIMIT 1;"
    for(i=0;i<items.length;i++){


    }
    res.status(200).json({
        message:'will post the order on the server',
        item:req.body.products
    });
}); */


module.exports =router;