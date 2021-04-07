
var constants = require('./constants')
var mockData = require('./mockData')
var jwt = require("jsonwebtoken")
const http = require('http');

//====================================Dashboard======================================
const getGraph = (req, res) => {
    const BASE_URL = "http://192.168.0.35:3000"
    const fetchUrl = `${BASE_URL}/api/dashboards/uid/Ed-xapDGk`
    http.get(fetchUrl, (res) => console.log(res))

}
//====================================Inbox handler==================================
const sendMessage = (req, res) => {
    //Update both sender and receiver with message from mock database
    const {from,to,message} = req.body
    const msg = {
        "from" : from,
        "to" : to,
        "content" : message,
        "time_sent" : (new Date()).toString()
    }
    mockData.messages.forEach(u => {
        if(u["username"] === from || u["username"] === to) {
            if(u["username"] === from) u["msg_history"][to].push(msg)
            else if(u["username"] === to) u["msg_history"][from].push(msg)
        }
        console.log(u)
    })
}

const fetchMessageHistory = (req, res) => {
    const {username} = req.query
    mockData.messages.forEach(u => {
        if(u["username"] === username) {
            res.send(u)
        }
    })
    
}
//====================================Login handler==================================
const handleLogin = (req, res) => {
    const {username, password} = req.body
    let currentUser = null
    let token = null
    mockData.mockUserData.forEach(userData => {
        if(userData["username"] === username && userData["password"] === password) //TODO: should be sending hashed pwd
        {
            currentUser = userData;
            token = createSessionToken(currentUser)
        }
    })
    res.send({token: token})
}

//====================================jwt handler=====================================
const createSessionToken = (userData) => {
    //Simple token method
    let userDataCp = Object.assign({}, userData)
    delete userDataCp.password //Remove password from token
    var token = jwt.sign(userDataCp, constants.privateKey, { expiresIn: 60*60 }); //Set timing to an hour
    return token
}

const getDecodedToken = (req, res) => {
    const {token} = req.body
    let decoded_token = null

    if (!token) res.status(500).send({err_msg : constants.ERR_MSGS.NULL_TOKEN})

    jwt.verify(token ,constants.privateKey, (err, decoded) => {
        if (err && err.name === "TokenExpiredError") res.status(500).send({err_msg : constants.ERR_MSGS.EXPIRED_TOKEN})
        else if (err) res.status(500).send({err_msg : constants.ERR_MSGS.INVALID_TOKEN})
        decoded_token = decoded
    })

    res.send(decoded_token)
}

const validateToken = (req, res) => {
    const {token} = req.body
    let isTokenValid = true
    if(!token) isTokenValid = false
    else
        jwt.verify(token ,constants.privateKey, (err, decoded) => {
            if (err && err.name === "TokenExpiredError") {isTokenValid = false; console.log("Token expired")}
            else if (err) { isTokenValid = false; console.log(err)}
        })
    res.send({isTokenValid: isTokenValid})
}

module.exports = {
    handleLogin: handleLogin,
    getDecodedToken: getDecodedToken,
    validateToken : validateToken,
    sendMessage: sendMessage,
    fetchMessageHistory: fetchMessageHistory,
    getGraph: getGraph
}