var express = require('express');
var router = express.Router();
var request = require('request');

var botID= "3e535eaec161c3cf9d48d31fc3";

router.post('/', function(req, res) {
    var body = req.body;
    
    var body_array = body['text'].split(" ");

    var firstWord = body_array[0].toLowerCase();

    if(firstWord === 'alejandro'){
        console.log('is alejandro message');


        if(body_array.length > 1){

            var command = body_array[1].toLowerCase();

            if(command === 'say'){
                var string = "";
                for(var i = 2; i < body_array.length; i++){
                    string += body_array[i] + " ";
                }

                request.post({url:'https://api.groupme.com/v3/bots/post', form: {bot_id:botID, text:string}}, function(err,httpResponse,body){
                    console.log("SENT GM MESSAGE: " + string);
                });
            }

        }else{
            request.post({url:'https://api.groupme.com/v3/bots/post', form: {bot_id:botID, text:"You called?"}}, function(err,httpResponse,body){
                console.log("SENT GM MESSAGE: you called?");
            });
        }

        res.send('{"status":"200"}');
    }else{
        res.send('{"status":"201"}');
    }

});

module.exports = router;
