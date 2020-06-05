const express = require('express')
const path = require('path')
const hbs = require('hbs')

const chat_dialog = require('./utils/chat_dialog')
const mongodb = require('./utils/mongodb')

const app = express()
const publicPath = path.join(__dirname,'../public')

app.set('view engine', 'hbs')
app.use(express.static(publicPath))

app.get('/chatbot', (req, res) => {
    res.render('chatbot')
})

// api เรียกใช้ text query กับ chatbot
app.get('/chat', (req, res) => {
    chat_dialog(req.query.message, (data) => {
        res.send({
            chat: data
        })
    })
})

// api เรียกประวัติแชทจาก database หรือ เพิ่มประวัติแชทลง database
app.get('/chat_history', (req, res) => {
    mongodb(req.query.action, req.query.user, req.query.message, (data) => {
        res.send({
            chat: data
        })
    })
})

const server = app.listen(3000, () => {
})
<<<<<<< HEAD
=======

/////////////
// var apiai = require('apiai');
// var APIAI_TOKEN =apiai("you access token key"); //use a api token from the official site
// const APIAI_SESSION_ID = "none"; //use a session id

// const io = require('socket.io')(server);
// io.on('connection', function(socket){
//   console.log('a user connected');
// });

// io.on('connection', function(socket) {
//     socket.on('chat message', (text) => {
//       console.log('Message: ' + text);
  
//       // Get a reply from API.ai
  
//       let apiaiReq = APIAI_TOKEN.textRequest(text, {
//         sessionId: APIAI_SESSION_ID
//       });
  
//       apiaiReq.on('response', (response) => {
//         let aiText = response.result.fulfillment.speech;
//         console.log('Bot reply: ' + aiText);
//         socket.emit('bot reply', aiText);
//       });
  
//       apiaiReq.on('error', (error) => {
//         console.log(error);
//       });
  
//       apiaiReq.end();
  
//     });
// });

////////////
>>>>>>> 3c917597098d44868c469c409bd9f686530ba306
