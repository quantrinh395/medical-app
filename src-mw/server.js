//Middleware proxy
//imports only
var express = require('express')
var ws = require('ws')
var http = require('http')
var app = express()
var cors = require('cors')
var router = require('./router')
var port = process.env.NODE_ENV || 3001
var wsHandler = require('./wsHandler')

//For configurations
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)

var server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log("a user connected")
})

server.listen(port, () => {
    console.log(`Listening to port ${port}`)
})