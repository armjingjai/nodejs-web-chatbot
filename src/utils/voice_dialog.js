var fs = require("fs")
var apiai = require("apiai");

var appAi = apiai("your access token", {
    language: 'en'
});

var options = {
    sessionId: 'none'
};
var request = appAi.voiceRequest(options);

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error.responseBody);
});

fs.readFile("voice_request.wav", function(error, buffer) {
    if (error) {
        console.log(error);
    } else {
        request.write(buffer);
    }

    request.end();
});
