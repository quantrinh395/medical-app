import axios from "axios"
const BASE_API_HOST = "http://localhost:3001"

export const sendMessage = async (from, to, message) => {
    const payload = {
        handlerType: "send_message",
        from: from,
        to : to,
        message: message
    }
    await axios.post(`${BASE_API_HOST}/v1/user/message`, payload)
}

export const fetchMessageHistory = async (username) => await axios.get(`${BASE_API_HOST}/v1/user/message?username=${username}`)