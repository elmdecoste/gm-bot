var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function(req, res) {
    var body = req.body;

    console.log(body);

    if(body['text'].toLowerCase().indexOf('alejandro') < 2){
        res.send('{"containsName":"true"}');
    }else{
        res.send('{"containsName":"false"}');
    }
});

module.exports = router;
