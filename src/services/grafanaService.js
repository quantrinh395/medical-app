import axios from "axios"

const BASE_URL = "http://192.168.0.35:3000"


export const getGraph = async (uuid, from, to) => {
    const fetchUrl = `${BASE_URL}/api/dashboards/uid/${uuid}`
    axios.get(fetchUrl).then(res => console.log(res.data))
}