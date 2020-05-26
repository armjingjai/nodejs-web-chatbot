const express = require('express')
const path = require('path')
const hbs = require('hbs')

const chat_dialog = require('./utils/chat_dialog')
const mongodb = require('./utils/mongodb')

const app = express()
const publicPath = path.join(__dirname,'../public')

// const projectRoot = path.resolve(__dirname)
// console.log(projectRoot)
// app.use('/test',express.static(projectRoot))

app.set('view engine', 'hbs')
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Arm'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Weather app',
        name: 'Arm'
    })
})

app.get('/webviewtest', (req, res) => {
    res.render('webviewtest')
})

app.get('/game', (req, res) => {
    if(req.query){
        
    }
    res.render('game')
})

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

app.get('/wether',(req, res) => {
    res.send('Weather')
})

const server = app.listen(3000, () => {

})

/////////////
// var apiai = require('apiai');
// var APIAI_TOKEN =apiai("5435097a2625406cb27b78b322f1088e"); //use a api token from the official site
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