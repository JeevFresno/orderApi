//logisticController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended :true}));


//get all the date from the between 2 dates order by product
//Date format (YYYY-MM-DD)
router.get('/start/:startDate/end/:endDate',function(req,res){

    res.status(200).json({
        startDate:req.params.startDate,
        endDate:req.params.endDate,
        products:'fetching'
    });
});


module.exports = router;