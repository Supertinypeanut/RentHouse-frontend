import axios from 'axios'

// 设置基地值
const baseURL = 'http://localhost:8080'

const http = axios.create({
    baseURL,
    timeout: 1000
})

export default http

export const pppp = 23