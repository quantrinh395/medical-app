//Websocket handlers
var mockData = require('./mockData')

const handleSendMessage = (data) => {
    mockData.mockUserData.forEach(u => {
        if(u["username"] === data["from"]) {
            let msg = {
                "from" : data["from"],
                "to" : data["to"],
                "content" : data["message"],
                "time_sent" : (new Date()).toString()
            }
            u["messages"][data["to"]].push(msg)
        }
    })
    mockData.mockUserData.forEach(u => console.log(u["messages"]))
    return true
}

module.exports = {
    sendMessage : handleSendMessage
}