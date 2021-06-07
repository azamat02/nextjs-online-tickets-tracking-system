import axios from "axios";


export default class ApiService {
    constructor() {
        this._apiBase = `http://localhost:4200/api`;
    }

    getAction = async (id) => {
        const res = await axios.get(`${this._apiBase}/actions/${id}`)
        return res
    }

    getAllActions = async () => {
        let res = await axios.get(`${this._apiBase}/actions`)
        return res
    }

    loginUser = async (userData) => {
        let res = await axios.post(`${this._apiBase}/login`, userData, { withCredentials: true })
        return res
    }

    registerUser = async (userData) => {
        let res = await axios.post(`${this._apiBase}/register`, userData, { withCredentials: true })
        return res
    }

    isAuth = async () => {
        let res = await axios.get(`${this._apiBase}/auth`, { withCredentials: true })
        return res
    }

    logoutUser = async () => {
        let res = await axios.get(`${this._apiBase}/logout`, { withCredentials: true })
        return res
    }
}