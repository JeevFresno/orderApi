//logisticController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended :true}));

var logisticsMethod = require('../db');

//get all the date from the between 2 dates order by product
//Date format (YYYY-MM-DD)
router.get('/start/:startDate/end/:endDate',logisticsMethod.productBreakDownByDate);

router.get('/storyThree',logisticsMethod.sqlQuery)


module.exports = router;