var apiai = require("apiai")
var appAi = apiai("Your client accesss token") //use a api token from the official site
var APIAI_SESSION_ID = "none" //use a session id 
// session id สำหรับส่ง text ไป query ยัง session นั้นๆ เป็น optional

const chat_dialog = (message, callback) => {

    var options = {
        sessionId: APIAI_SESSION_ID
    };
    
    var request = appAi.textRequest(message, options)
    
    request.on('response', function(response) {
        console.log(response);
        callback(response.result.fulfillment.speech)
    });
    
    request.on('error', function(error) {
        console.log(error)
    });
    
    request.end()
}

module.exports = chat_dialog
