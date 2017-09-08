//db.js

//var mongoose = require('mongoose');
//mongoose.connection.openUri('mongodb://root:root@ds121674.mlab.com:21674/dummydb')

var pg = require('pg');
var conString ="postgres://zykgddocgxmjsg:c6bd27fb311a865ec0b70a54ef83c2db216d78de7958ffa46f854b8f37c6baee@ec2-107-22-211-182.compute-1.amazonaws.com:5432/d5ptk1vsj4nrt2?ssl=true";
pg.defaults.ssl = true;
var client = new pg.Client(conString);

//connecting to the database
   client.connect(function(err){
        if(err)
            console.log(err.stack);
        else
            console.log("Connected to the database");
    });


//get all the user from the Database
function getAllUsers(req,res,next){

    var query ="SELECT * from customer";
    try{

        client.query(query,function(err,data){

            res.status(200).json({
                status: 'success',
                totalRows: data.rowCount,
                data: data.rows,
                message: 'Retrieved all the users'
            });

        });

    }catch(err){
        res.status(500).json({
            message : err.status
        })
    }
}

//get single user from the databse
function getSingleUser(req,res,next){
    var email = req.params.id;
    var query=('select * from customer where id = $1');
    try{
        client.query(query,[email],function(err,data){

            if(data.rowCount>0){

                res.status(200).json({
                    status: 'success',
                    data: data.rows,
                    message: 'Retrieved Single User'
                });
            }else {

                res.status(404).json({
                    message: 'No Such User'
                });
            }
        });
    }catch(err){
        res.status(500).json({
            message : err.status
        })
    }

}

//creating the user
function createUser(req,res,next){

    var name = req.body.name ;
    var email = req.body.email;
    if(email ==null || email == undefined || name == null || name == undefined){
        res.status(500).json({
            message: 'invalid parameters'
        });

    }else{

        var query ="INSERT INTO CUSTOMER(firstname,email) values($1,$2) Returning *";
        try{
            client.query(query,[name,email],function(err,data){
                console.log(data.rows[0].id);
                res.status(201).json({
                    status:201,
                    message:'User Created',
                    UserID: data.rows[0].id
                })
            });
        }catch(err){
            res.status(500).json({
                message : err.status
            })
        }

    }
}

function allOrdersInDB(req,res){

    var query="SELECT * from orders";
    client.query(query,function(err,data){
        if(err){
            res.status(400).json({
                messages:'Failed'
            })
        }else{
            res.status(400).json({
                messages:'All orders',
                orders:data.rows
            });
        }
    });
}

function allOrdersOfUsers(req,res,next){

    var id = req.params.userID;
    console.log(id);
    if(id == null || id == undefined){
        res.status(400).json({
            message: 'Invalid parameters'
        });
    }else{
        var query ="select * from orderDetails where userid = $1 ORDER BY order_id;"
        try{

            client.query(query,[id],function(err,data){

                var groubedByID=groupBy(data.rows, 'order_id');
               // console.log(groubedByTeam);
                res.status(200).json({
                    message: 'success',
                    data: groubedByID,
                })
            })
        }catch(err){
            res.status(500).json({
                message: err.status
            })
        }
    }
}
//grouping the data based on the order_id
var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};


//METHOD TO INSERT THE ORDER DETAILS OF THE CUSTOMER
var status=['delivered','waiting','on it\'s way'];
var order_id; var items; var userId; var stat;
function insertOrderOfUser(req,res,next){

    var query = "Insert into orders(customer_id,status,date) values($1,$2,$3) RETURNING order_id"
    userId = req.params.userID;
     items = req.body.items;
     console.log(userId);console.log(items);
    if(userId ==null || userId == undefined || items ==null || items == undefined){
        res.statusCode=400;
        res.status(400).json({
            status: res.statusCode,
            message: 'User ID or list of items is missing or malformed'
        });
    }else{
       stat = status[1];
        client.query(query,[userId,stat,new Date()],function(err,data){
            if(err)
                console.log(err.stack)
            else{
                console.log("Order ID="+data.rows[0].order_id)
                order_id =data.rows[0].order_id;

                items = items.split(",");
                console.log(items);

                for(var i=0;i<items.length;i++){
                    //console.log(items[i]);
                    var item_quant = items[i].split(",");
                    var data = auxFindTheCategory(item_quant+'');
                    //console.log("Returned Data = "+data);
                }
                setTimeout(auxInsertOrderDetails,120);

                setTimeout(function(){
                    res.status(200).json({
                        orderID: 'Your order id is'+order_id,
                        status: stat
                    });
                },140)
            }

        });
    }
}


var results=[];
function auxInsertOrderDetails(req,res){

    //we have order ID here
    //items has quantity and name of the product
    //result has category id and category name
    //date is being inserted right at the moment
    //console.log(var i=0;i<results.length;i++){
    console.log(results);
    console.log("Order ID = "+order_id);
    var query = "insert into orderdetails values($1,$2,$3,$4,$5,$6,$7,$8);"
    for(var i=0;i<results.length;i++){
        var details = results[i].split(" ");
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var proId = details[0]; var proname = details[1]; var quan = details[2];var catid = details[3]; var catName = details[4];
        client.query(query,[order_id,proId,quan,new Date(),proname,catid,catName,userId],function(err,rows){
            if(err)
                console.log(err.stack)
        });
    }
    results =[];
}
function auxFindTheCategory(item,req,res){

    console.log(item);
    var itemX = item.split(" ");
    console.log("Item ="+itemX[0]);
    var x = itemX[0]; var quan = itemX[1];
    var que ="select  product.id as ProductID, product.productName as ProductName ,  category.id as ID, category.categoryName as Category_Name from category,product where category.id = ANY (select category_id from productcategories where product_id = ANY (SELECT id as pID from product where productName=$1)) and product.productName =$2;\n"
    var query1 = "SELECT id  from product where productName=$1";

    client.query(que,[x,x],function(err,data){
       // console.log(data.rows)
        if(data.rowCount>1){
            for(i=0;i<data.rowCount;i++){
                results.push(data.rows[i].productid+" "+data.rows[i].productname+" "+quan+" "+data.rows[i].id+" "+data.rows[i].category_name)
            }
        }else{
            results.push(data.rows[0].productid+" "+data.rows[0].productname+" "+quan+" "+data.rows[0].id+" "+data.rows[0].category_name);
        }

    });


   // return category;
}

var dateRange=[];
//METHOD TO BREAKDOWN OF THE PRODUCTS BY PURCHASE
function productBreakDownByDate(req,res){

    var startDate=req.params.startDate;
    var endDate=req.params.endDate;
    auxGenerateDays(startDate,endDate);
    setTimeout(function(){
        var groupedByDate=groupBy(dateRange, 'date');
        res.status(200).json({
            status:'success',
            data:groupedByDate
        })
    },500)
    setTimeout(auxProductBreakDown,200);
}

function auxProductBreakDown(){
    console.log(dateRange)
}
function auxGenerateDays(start,end){

    var query ="SELECT day::date\n" +
        "      FROM\n" +
        "     generate_series($1, $2, INTERVAL '1 day') day";

    var query2 ="select\n" +
        "  orderDetails.product_name,\n" +
        "  sum(orderDetails.quantity),\n" +
        "  orderDetails.date::date\n" +
        "  from\n" +
        "  orderDetails\n" +
        "  where\n" +
        "    orderDetails.date::date = $1" +
        "     GROUP BY orderDetails.product_name,orderDetails.date::date;"

    console.log(typeof start);
    console.log(typeof end);
    client.query(query,[start,end],function(err,data){
        if(err){
           console.log(err.stack)
        }else{
            console.log(data);
            if(data.rowCount>1){
                for(var i=0;i<data.rowCount;i++){

                    client.query(query2,[data.rows[i].day],function(err,data){
                        if(err)
                            console.log(err.stack);
                        else{
                            dateRange.push(data.rows);
                            console.log(data.rows);
                        }

                    })

                }
            }else{

                client.query(query2,[data.rows[0].day],function(err,data){
                    if(err)
                        console.log(err.stack);
                    else{
                        console.log(data.rows);
                        dateRange.push(data.rows);
                    }

                });

            }
        }

    });
}

//METHOD OUTPUTS THE USER AND ITS BUYOUTS BASED ON THE CATEGORY
function sqlQuery(req,res,next){
    var query ="SELECT\n" +
        "      customer.id as customer_id,\n" +
        "      customer.firstName as customer_first_name,\n" +
        "      orderDetails.category_id as category_id,\n" +
        "      orderDetails.category_name as category_name,\n" +
        "      sum(orderDetails.quantity)as number_purchased\n" +
        "    from\n" +
        "        customer , orderDetails\n" +
        "    where customer.id =orderDetails.userid\n" +
        "    GROUP BY\n" +
        "    customer_first_name,customer.id,category_id,category_name;";

    client.query(query,function(err,data){
        try{
            res.status(200).send({
                status: 'success',
                data: data.rows
            });
        }catch(err){
            return next(err);
        }
    })
};
//updating the user
function updateUser(req,res,next){

}

function deleteUser(req,res,next){

}

//exporting out the user's function
module.exports={
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    insertOrderOfUser: insertOrderOfUser,
    allOrdersOfUsers: allOrdersOfUsers,
    sqlQuery: sqlQuery,
    productBreakDownByDate:productBreakDownByDate,
    allOrdersInDB:allOrdersInDB
};

