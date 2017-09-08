
var faker = require('faker');
var pg = require('pg');
//var conString ="postgres://localhost:5432/shiptdb";

var client = new pg.Client(conString);

//connecting to the database
 client.connect(function(err){
    if(err)
        return "Error Connecting to the database";
    else
        console.log("Connected to the Shipt database");
});



var products =['seasoned parmesan','milk','whey','butter','cheese','sour cream','Black pepper', 'cumin', 'cinnamon','Beer','Cider', 'liquor', 'Hard soda',
'Wine' , 'Barley','Beef','Pork','Chicken','Duck','Prawns','Lobsters','Carrot','Tomatoes','Apple','Pea','Spinach','Brocoli','Avocados','Mango','Raw Mango'];
var dairy =['seasoned parmesan']; //1
var spices =[]; //2
var beverages=[]; //3
var meat=[]; //4
var vegetables=[]; //5

var map =[{
    product:'', category:'',
}]
var query ='Insert into customer(firstname,email) values($1,$2)';
var query2 ='Insert into product(productname) values($1)';

    for(var i=0;i<products.length;i++){

        var pro =products[i].toLowerCase();
       client.query(query2,[pro],function(err,res){
           if(err)
               console.log(err.stack);

       });
    }

    module.exports=client;
