import Head from "next/head";
import Navbar from "../../components/navbar/navbar";
import Link from "next/link";
import {useEffect, useState} from "react";
import Spinner from "../../components/spinner/spinner";
import axios from "axios";
import swal from "sweetalert";
import Router from "next/router";
import Footer from "../../components/footer/footer";

export default function ReqPage({userData}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
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

    let submit = async (e) =>{
        e.preventDefault()

        if (email.length != 0 && name.length != 0 && login.length !=0 && pass.length != 0){

            let userData = {
                login: login,
                password: pass,
                name: name,
                email: email
            }

            setSpinner(<Spinner/>)

            let res = await axios.post('http://localhost:4200/api/register', userData, { withCredentials: true })
            let message = res.data.message

            setSpinner(null)
            if (message === 'User registered successfully!'){
                swal( "Успех" ,  "Вы успешно зарегестрировались! Зайдите в свой аккаунт." ,  "success")
                location.href = '/login'
            } else {
                swal( "Ошибка" ,  message ,  "error")
            }
        } else {
            swal( "Упс" ,  "Введите все данные!" ,  "info")
        }
    }

    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            <main className="px-44">
                {/*Navbar*/}
                <Navbar userData={userData}/>
                {/*Header*/}
                <div className="flex justify-center mt-10">
                    <div className="px-10 py-10 mt-5 border-gray-100 border-2 rounded-md shadow-lg w-1/2">
                        <h1 className="text-xl font-bold text-gray-900 text-center">Регистрация</h1>
                        <div className="mt-7">
                            <form onSubmit={(e)=>submit(e)}>
                                <input type="text"
                                       onChange={(e)=>setNameg(e.target.value)}
                                       className="px-4 py-3 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                       placeholder="Введите имя"/>

                                <input type="text"
                                       onChange={(e)=>setLogin(e.target.value)}
                                       className="px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                       placeholder="Введите логин"/>

                                <input type="email"
                                       onChange={(e)=>setEmail(e.target.value)}
                                       className="px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                       placeholder="Введите почту"/>

                                <input type="password"
                                       onChange={(e)=>setPass(e.target.value)}
                                       className="px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                       placeholder="Введите пароль"/>

                                <button className="w-full block mt-5 px-10 py-3 bg-blue-500 rounded font-bold text-white hover:bg-blue-400 transition">
                                    Регистрация
                                </button>
                                <Link href="/login">
                                    <p className="mt-2 cursor-pointer text-blue-500 underline text-center">Есть аккаунт? Войти</p>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}