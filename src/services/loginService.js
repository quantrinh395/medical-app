import axios from 'axios'
const BASE_API_HOST = "http://localhost:3001"

export const login = async (username, password) => await axios.post(`${BASE_API_HOST}/v1/user/login`, {username: username, password: password})

export const getUserData = async (token) => await axios.post(`${BASE_API_HOST}/v1/user/getUserData`, {token: token})

export const getUserToken = () => {
    return localStorage.getItem("sessionToken")
}

export const validateSessionToken = async (token) => await axios.post(`${BASE_API_HOST}/v1/user/validateSessionToken`, {token: token})

export const clearUserToken = () => {
    localStorage.removeItem("sessionToken")
}

export const logout = () => {
    clearUserToken()
    window.location.reload()
}
