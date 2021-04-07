//Router and stuff
var express = require('express')
var router = express.Router()
var handler = require('./handlers')

router.post('/v1/user/login', handler.handleLogin)
router.post('/v1/user/getUserData', handler.getDecodedToken)
router.post('/v1/user/validateSessionToken', handler.validateToken)
router.post('/v1/user/message', handler.sendMessage)
router.get('/v1/user/message', handler.fetchMessageHistory)
router.get('/v1/grafana/dashboard', handler.getGraph)

module.exports = router