var express = require('express');
var router = express.Router();
var request = require('request');

var botID= "3e535eaec161c3cf9d48d31fc3";

router.post('/:id', function(req, res) {
    var body = req.body;

    var bot_id = req.params.id;

    var body_array = body['text'].split(" ");

    var firstWord = body_array[0].toLowerCase();

    if(firstWord === 'alejandro'){
        console.log('is alejandro message');


        if(body_array.length > 1){

            var command = body_array[1].toLowerCase();

            switch(command){
                case 'say':
                    var sayMessage = stringAfterCommand(body_array);
                    sendMessage(sayMessage, bot_id);
                    break;
                case 'compliment':
                    var name = stringAfterCommand(body_array);

                    if(name === 'me'){
                        name = 'You';
                    }

                    var compliments = ['is beautiful', 'is amazing', 'is spectacular'];

                    var complimentMessage = name + compliments[getRandomIndex(0, compliments.length)];

                    sendMessage(complimentMessage, bot_id);

                    break;
                case 'joke':
                    var jokes = ['Knock Knock, who\'s there. It\'s me, Alejandro'];

                    var jokeMessage = jokes[getRandomIndex(0, jokes.length)];

                    sendMessage(jokeMessage, bot_id);

                    break;
                default:
                    sendMessage('Hey what\'s up?')

            }

        }else{
            sendMessage('You called?')
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

function sendMessage(message, bot_id){
    request.post({url:'https://api.groupme.com/v3/bots/post', form: {bot_id:bot_id, text:message}}, function(err,httpResponse,body){
        console.log("SENT GM MESSAGE: " + message);
    });
}

module.exports = router;
