import '../styles/globals.css'
import axios from "axios";
import {useEffect, useState} from "react";
import ApiService from "../services/apiService";

export default function MyApp({ Component, pageProps }) {
    const [userData, setUserData] = useState(null)
    let api = new ApiService()

    useEffect(()=>{
        if (userData === null){
            (
                async ()=>{
                    let res = await api.isAuth()
                    let message = res.data.message
                    if (message === 'Authenticated') {
                        setUserData(res.data.userData)
                    } else {
                        setUserData(false)
                    }
                }
            )();
        }
    },[userData])

    return <Component {...pageProps} userData={userData}/>
}