import Navbar from "../../components/navbar/navbar";
import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState} from "react";
import axios from "axios";
import swal from 'sweetalert'
import Spinner from "../../components/spinner/spinner";
import Router from 'next/router'

export default function Login({userData}){
    const [login, setLogin] = useState();
    const [pass, setPass] = useState();
    const [spinner, setSpinner] = useState(null)

    useEffect(()=>{
        if (userData !== null){
            console.log(`User data: ${userData}`)
            if (userData !== false){
                swal('Упс','Вы уже зашли в свой аккаунт','info')
                Router.push('/')
            }
        }
    })

    let changeData = (e, type) => {
        let inputValue = e.target.value;

        if (type === 'login') {
            setLogin(inputValue)
        }
        if (type === 'pass'){
            setPass(inputValue)
        }
    }

    let submit = async (e) =>{
        e.preventDefault()

        let userData = {
            login: login,
            password: pass,
        }

        setSpinner(<Spinner/>)

        let res = await axios.post('http://localhost:4200/api/login', userData, { withCredentials: true })
        let message = res.data.message

        setSpinner(null)
        if (message === 'You are logged in!'){
            swal( "Успех" ,  "Вы вошли в свой аккаунт!" ,  "success")
            location.href = '/'
        } else {
            swal( "Ошибка" ,  "Введенные данные неправильные!" ,  "error")
        }
    }

    let authBlock =  (
        <>
            <div className="px-10 py-5 mt-5">
                <h1 className="text-xl font-bold text-gray-900 text-center">Авторизация</h1>
                <div className="mt-7 mx-10">
                    <form onSubmit={(e)=>submit(e)}>
                        <input onChange={(e)=>{changeData(e, 'login')}} type="text"
                               className="px-4 py-3 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                               placeholder="Введите логин"/>
                        <input onChange={(e)=>{changeData(e, 'pass')}} type="password"
                               className="px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                               placeholder="Введите пароль"/>
                        <button className="w-full block mt-5 px-10 py-3 bg-blue-500 rounded font-bold text-white hover:bg-blue-400 transition">
                            Войти
                        </button>
                        <Link href="/reg">
                            <p className="cursor-pointer text-blue-500 underline text-center">Регистрация</p>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )

    return (
        <>
            <Head>
                <title>Авторизация</title>
            </Head>
            <main className="px-44">
                {/*Navbar*/}
                <Navbar userData={userData}/>
                <div className="grid grid-cols-2 mx-24 mt-24 border-2 border-gray-100 rounded-md shadow-lg">
                    <div className="bg-gray-200">
                        <img src="https://bit.ly/2S5ZeXn" alt=""/>
                    </div>
                    {spinner ?? authBlock}
                </div>
            </main>
        </>
    )
}