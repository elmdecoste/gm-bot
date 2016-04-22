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
                var string = stringAfterCommand(body_array);

                request.post({url:'https://api.groupme.com/v3/bots/post', form: {bot_id:botID, text:string}}, function(err,httpResponse,body){
                    console.log("SENT GM MESSAGE: " + string);
                });
            }else if(command === 'compliment'){
                var name = stringAfterCommand(body_array);

                var compliments = ['is beautiful', 'is amazing', 'is spectacular'];

                var message = name + compliments[getRandomIndex(0, compliments.length)];

                request.post({url:'https://api.groupme.com/v3/bots/post', form: {bot_id:botID, text:message}}, function(err,httpResponse,body){
                    console.log("SENT GM MESSAGE: " + message);
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

function stringAfterCommand(array){
    var string = "";
    for(var i = 2; i < array.length; i++){
        string += array[i] + " ";
    }

    return string;
}

function getRandomIndex(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

module.exports = router;
