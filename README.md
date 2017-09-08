# orderApi

Shipt Software Engineer Coding Challenge


Language Used: NodeJs
Database Used: PostgreSQL
Hosted: Heroku and tested locally 
URL: https://shiptapi.herokuapp.com
Github: https://github.com/JeevFresno/orderApi


Asssumptions:
1.	Assumed Few popular categories and products
2.	Assigned Products to categories 
3.	Did not considered inventory in this project
4.	User can only order products which are available in the products table 

Let’s start with the database schema:

Tables:
1.	Customer table: information regarding the user
2.	Products table: information regarding products
3.	Categories table: information regarding categories 
4.	ProductCategories: Satisfying many-many relationship between products and categories 
5.	Order: order details of each user
6.	OrderDetails: detail information of each order of the user 

Following diagram below showcase the UML of database schema.



Fig: Database Schema, database used is PostgreSql


•	REST API:

Resources:

Base URL: : https://shiptapi.herokuapp.com
Resources:
1.	/users
2.	/orders
3.	/logistics


/USER RESOURCE 

GET  /Users/
Retrieves a list of the users from the database
https://shiptapi.herokuapp.com/users/

GET  /users/:userid
Retrieves the information of the specific user
https://shiptapi.herokuapp.com/users/11/
Example: 
{“status”:”success”,”data”:[{“id”:11,”firstname”:”jeevjyot”,”email”:”jeevjyotchhabda@gmail.com”}],”message”:”Retrieved Single User”}

Post  /users/
{
	“name”: String
	“email”:String
}
,
esponse 
HTTP 201{
    “status”:200	
    "message": "User Created"
     “UserID”: Integer
}


/ORDER RESOURCE 

GET /orders

https://shiptapi.herokuapp.com/orders/

Retrieves all the orders from the database
HTTP 200{
    "messages": "All orders",
    "orders": [
        {
            "order_id": 23,
            "customer_id": 11,
            "status": "waiting",
            "date": "2017-09-08T01:28:56.468Z"
        },
        {
            "order_id": 24,
            "customer_id": 11,
            "status": "waiting",
            "date": "2017-09-08T01:30:41.176Z"
        },
        
    ]
}








GET /orders/:userID
{
	Key: Value
	Userid: Integer
}

Retrieves all the orders of the user 

https://shiptapi.herokuapp.com/orders/11/

HTTP 200 {
    "message": "success",
    "data": {
        "26": [
            {
                "order_id": 26,
                "product_id": 4,
                "quantity": 1,
                "date": "2017-09-07T20:26:47.798Z",
                "product_name": "butter",
                "category_id": 1,
                "category_name": "Dairy",
                "userid": 2
            },
            {
                "order_id": 26,
                "product_id": 5,
                "quantity": 1,
                "date": "2017-09-07T20:26:47.798Z",
                "product_name": "cheese",
                "category_id": 1,
                "category_name": "Dairy",
                "userid": 2
            },
            {
                "order_id": 26,
                "product_id": 29,
                "quantity": 6,
                "date": "2017-09-07T20:26:47.798Z",
                "product_name": "mango",
                "category_id": 7,
                "category_name": "Fruits",
                "userid": 2
            }
        ]
    }
}


POST /orders/:userID
{
	Items: ItemName Quantity, ItemName Quantity……
}
EXAMPLE: [{"key":"items",
                    "value":"apple 1,wine 2"}]

ItemName: Name of the product
Quantity: Number of that very product purchased. 

Parameters: UserID, which is integer, userID is unique to each user. 
Response:
HTTP 201
{
    "orderID": "Your order id is44",
    "status": "waiting"
}




/logistics

GET /logistics/start/:startdate/end/:enddate

Start date and end date are in the format of YYYY-MM-DD 

Example: https://shiptapi.herokuapp.com/logistics/start/2017-09-07/end/2017-09-07

Breakdown of the product on all the dates between start date and end date
As of now Database consist of only two days. But I have coded for all inputs.

RESPONSE:
{
    "status": "success",
    "data": {
        "undefined": [
            [
                {
                    "product_name": "apple",
                    "sum": "6",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "beef",
                    "sum": "2",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "beer",
                    "sum": "24",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "butter",
                    "sum": "1",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "carrot",
                    "sum": "18",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "cheese",
                    "sum": "1",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "chicken",
                    "sum": "2",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "cider",
                    "sum": "2",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "duck",
                    "sum": "9",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "mango",
                    "sum": "6",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "milk",
                    "sum": "3",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "pea",
                    "sum": "20",
                    "date": "2017-09-07T00:00:00.000Z"
                },
                {
                    "product_name": "whey",
                    "sum": "6",
                    "date": "2017-09-07T00:00:00.000Z"
                }
            ]
        ]
    }
}

One more Example 

https://shiptapi.herokuapp.com/logistics/start/2017-09-07/end/2017-09-08



GET /logistics/sqlThree

https://shiptapi.herokuapp.com/logistics/storyThree

customer_id | customer_first_name | category_id | category_name | number_purchased
--- | --- | --- | --- | --- | ---
1 |John | 1 | Bouquets | 15

SQL QUERY

SELECT
      customer.id as customer_id,
      customer.firstName as customer_first_name,
      orderDetails.category_id as category_id,
      orderDetails.category_name as category_name,
      sum(orderDetails.quantity)as number_purchased
    from
        customer , orderDetails
    where customer.id =orderDetails.userid
    GROUP BY
    customer_first_name,customer.id,category_id,category_name;


{
    "status": "success",
    "data": [
        {
            "customer_id": 11,
            "customer_first_name": "jeevjyot",
            "category_id": 3,
            "category_name": "Vegetables",
            "number_purchased": "26"
        },
        {	
            "customer_id": 2,
            "customer_first_name": "Preston Roberts",
            "category_id": 7,
            "category_name": "Fruits",
            "number_purchased": "6"
        },
        {
            "customer_id": 2,
            "customer_first_name": "Preston Roberts",
            "category_id": 1,
            "category_name": "Dairy",
            "number_purchased": "2"
        },
        {
            "customer_id": 7,
            "customer_first_name": "Addison Rowe",
            "category_id": 4,
            "category_name": "Meat",
            "number_purchased": "6"
        },
        {
            "customer_id": 10,
            "customer_first_name": "Salma Howe",
            "category_id": 1,
            "category_name": "Dairy",
            "number_purchased": "1"
        },
        {
            "customer_id": 7,
            "customer_first_name": "Addison Rowe",
            "category_id": 1,
            "category_name": "Dairy",
            "number_purchased": "1"
        },
        {
            "customer_id": 10,
            "customer_first_name": "Salma Howe",
            "category_id": 4,
            "category_name": "Meat",
            "number_purchased": "1"
        },
        {
            "customer_id": 6,
            "customer_first_name": "Mrs. Casimir Shanahan",
            "category_id": 3,
            "category_name": "Vegetables",
            "number_purchased": "6"
        },
        {
            "customer_id": 7,
            "customer_first_name": "Addison Rowe",
            "category_id": 7,
            "category_name": "Fruits",
            "number_purchased": "6"
        },
        {
            "customer_id": 6,
            "customer_first_name": "Mrs. Casimir Shanahan",
            "category_id": 1,
            "category_name": "Dairy",
            "number_purchased": "1"
        },
        {
            "customer_id": 5,
            "customer_first_name": "Letitia Pollich",
            "category_id": 7,
            "category_name": "Fruits",
            "number_purchased": "1"
        },
        {
            "customer_id": 10,
            "customer_first_name": "Salma Howe",
            "category_id": 3,
            "category_name": "Vegetables",
            "number_purchased": "6"
        },
        {
            "customer_id": 6,
            "customer_first_name": "Mrs. Casimir Shanahan",
            "category_id": 4,
            "category_name": "Meat",
            "number_purchased": "5"
        },
        {
            "customer_id": 5,
            "customer_first_name": "Letitia Pollich",
            "category_id": 5,
            "category_name": "Beverages",
            "number_purchased": "2"
        },
        {
            "customer_id": 11,
            "customer_first_name": "jeevjyot",
            "category_id": 5,
            "category_name": "Beverages",
            "number_purchased": "2"
        },
        {
            "customer_id": 11,
            "customer_first_name": "jeevjyot",
            "category_id": 4,
            "category_name": "Meat",
            "number_purchased": "7"
        },
        {
            "customer_id": 11,
            "customer_first_name": "jeevjyot",
            "category_id": 2,
            "category_name": "Spices",
            "number_purchased": "24"
        }
    ]
}


# Additional questions

Q. If Shipt knew exact inventory of stores, and when facing a high traffic and limited supply of particular item, how do you distribute the inventory among customers checking out?

The best way to handle would be through queues. All the request of the users can add to queue and can be processed in an orderly fashion. At the same, we can keep alerting the user that “ by the time you checkout, an item might not exist.”

This is a prevalent scenario we face when we are buying some concerts ticket, and they tend to get over soon. For example, early bird tickets, they are less and high demand. 

In my opinion, queue based processing would be useful and affordable ( event – based ). RabbitMQ could prove fruitful here.


Q. We want to give customers the ability to create lists of products for a one-click ordering of bulk items. How would you design the tables, what are the pros and cons of your approach?

We could hold the list of products chosen by the user in the temp table, active during that session and once a user is sure about the list of items. He can order, then we can process all products. 

The cache could also be very helpful. I am very clear of the question I guess. 


Code:

Directory Structure of the application 

ShiptApi/
	Logistics/
		logisticsController.js (all routes for logistics)
	node_module/
		All the necessary modules/Dependencies 
	Orders/
		orderController.js (all routes for order)
	User/
		userController.js (all routes for user)
	app.js  (taking care of the routes)
	
	db.js   (db connection and all methods talking to db)

	package.json

	server.js  (server file, listening port)
	
	sqlQuery.sql (story #3 answer)


