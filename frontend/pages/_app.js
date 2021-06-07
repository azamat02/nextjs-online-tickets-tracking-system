import '../styles/globals.css'
import axios from "axios";
import {useEffect, useState} from "react";

export default function MyApp({ Component, pageProps }) {
    const [userData, setUserData] = useState(null)

    useEffect(()=>{
        if (userData === null){
            (
                async ()=>{
                    let res = await axios.get('http://0.0.0.0:4200/api/auth', { withCredentials: true })
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