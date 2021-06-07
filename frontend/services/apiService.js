import axios from "axios";


export default class ApiService {
    constructor() {
        this._apiBase = `http://89.223.24.146:4200/api`;
    }

    getAction = async (id) => {
        const res = await axios.get(`${this._apiBase}/actions/${id}`)
        return res
    }

    getAllActions = async () => {
        let res = await axios.get(`${this._apiBase}/actions`)
        return res
    }

    getAllUsers = async () => {
        let res = await axios.get(`${this._apiBase}/users`, { withCredentials: true })
        return res
    }

    sendNotify = async (data) => {
        let res = await axios.post(`${this._apiBase}/notifications`, data, { withCredentials: true })
        return res
    }

    deleteUser = async (id) => {
        let res = await axios.get(`${this._apiBase}/users/delete/${id}`, { withCredentials: true })
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

    getUserNotifications = async (id)=>{
        let res = await axios.get(`${this._apiBase}/notifications/by/user/${id}`, { withCredentials: true })
        return res
    }

    isUserAdmin = async ()=>{
        let res = await axios.get(`${this._apiBase}/admin`, { withCredentials: true })
        return res
    }
}