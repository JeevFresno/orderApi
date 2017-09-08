//userController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended :true}));

var userDBFunction = require('../db');

//CREATING A USER
router.post('/',userDBFunction.createUser);

//RETURNS ALL THE USERS IN THE DATABASE
router.get('/',userDBFunction.getAllUsers);

//GETS A SINGLE USER FROM THE DATABASE
router.get('/:id',userDBFunction.getSingleUser);

module.exports = router;

