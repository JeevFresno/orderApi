//userController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended :true}));

var User = require('./User');

var userDBFunction = require('../db');
//CREATES A NEW USER

/*router.post('/',function(req,res){

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
        function(err,user){
        if(err) return res.status(500).send("There was a problem adding the information to the database ");
        res.status(200).send(user);
        });
});*/


//CREATING A USER
router.post('/',userDBFunction.createUser);

//RETURNS ALL THE USERS IN THE DATABASE
router.get('/',userDBFunction.getAllUsers);

//GETS A SINGLE USER FROM THE DATABASE
router.get('/:id',userDBFunction.getSingleUser);

// DELETES A USER FROM THE DATABASE
router.delete('/:id',userDBFunction.deleteUser);

//UPDATES A USER IN THE DATABASE
router.put('/:id',userDBFunction.updateUser);


module.exports = router;



/*
router.get('/',function(res,res){

    User.find({},function(err,users){
        if(err) return res.status(500).send("there was a problem finding the users. ");
        res.status(200).send(users);
    });
});

//GETS A SINGLE USER FROM THE DATABASE

router.get('/:id',function(res,res){
    User.findByID(req.params.id,function(err,user){
        if(err) return res.status(500).send("there was a problem finding the user.");
        if(!user) return res.status(404).send("No user found");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE

router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});


// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});
*/