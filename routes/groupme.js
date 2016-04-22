var express = require('express');
var router = express.Router();
var request = require('request');

var botID= "3e535eaec161c3cf9d48d31fc3";

router.post('/', function(req, res) {
    var body = req.body;

    console.log(body);

    if(body['text'].toLowerCase().indexOf('alejandro') < 2){

        request.post({url:'https://api.groupme.com/v3/bots/post', form: {bot_id:botID, text:"You called?"}}, function(err,httpResponse,body){
            console.log(httpResponse);
        })
        res.send('{"containsName":"true"}');
    }else{
        res.send('{"containsName":"false"}');
    }
});

module.exports = router;
