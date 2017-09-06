//db.js

//var mongoose = require('mongoose');
//mongoose.connection.openUri('mongodb://root:root@ds121674.mlab.com:21674/dummydb')

var pg = require('pg');
var conString ="postgres://localhost:5432/Jeevjyot";

var client = new pg.Client(conString);

//connecting to the database
  var connection =  client.connect(function(err){
        if(err)
            return "Error Connecting to the database";
        else
            console.log("Connected to the database");
    });

  module.exports = connection;

//get all the user from the Database
function getAllUsers(req,res,next){

    res.status(200).json({
        status: '200',
        message: 'Success, finding all the users in the database',

    });
}

//get single user from the databse
function getSingleUser(req,res,next){

    console.log(req.params.id);
    res.status(200).json({
        status:'200',
        id: req.params.id,
        message:'success'
    })
}

//creating the user
function createUser(req,res,next){

    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
}

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
    deleteUser: deleteUser
};