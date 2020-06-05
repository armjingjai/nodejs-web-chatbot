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
