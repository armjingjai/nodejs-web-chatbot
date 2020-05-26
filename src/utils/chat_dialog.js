var apiai = require("apiai");
var appAi = apiai("access token");//use a api token from the official site

const chat_dialog = (message, callback) => {

    var options = {
        sessionId: 'none'
        // session id สำหรับส่ง text ไป query ยัง session นั้นๆ เป็น optional
    };
    
    var request = appAi.textRequest(message, options);
    
    request.on('response', function(response) {
        console.log(response);
        callback(response.result.fulfillment.speech)
    });
    
    request.on('error', function(error) {
        console.log(error);
    });
    
    request.end();
}

module.exports = chat_dialog
