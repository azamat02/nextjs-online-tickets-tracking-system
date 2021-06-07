import {useEffect, useState} from "react";
import Head from "next/head";
import Navbar from "../components/navbar/navbar";
import {
    BellIcon,
    ChatAltIcon,
    IdentificationIcon,
    PaperAirplaneIcon,
    PlusCircleIcon,
    TrashIcon
} from "@heroicons/react/outline";
import Footer from "../components/footer/footer";
import ApiService from "../services/apiService";
import Spinner from "../components/spinner/spinner";
import Router from "next/router";
import swal from 'sweetalert'

export default function Admin({userData}) {
    const [isAdmin, setIsAdmin] = useState(null)
    const [users, setUsers] = useState(null)
    const [showNotifyBlock, setShowNBlock] = useState(false)
    const [userId, setUserId] = useState(null)

    let api = new ApiService()

    useEffect(()=>{
        if (isAdmin === null){
            (
                async()=>{
                    let res = await api.isUserAdmin()
                    let {message} = res.data
                    console.log(message)
                    if (message === 'Admin'){
                        setIsAdmin(true)
                    } else {
                        setIsAdmin(false)
                        Router.push('/404')
                    }
                }
            )()
        }
        if (users === null){
            (
                async()=>{
                    let res = await api.getAllUsers()
                    setUsers(res.data)
                }
            )()
        }
    })

    if (isAdmin === null || isAdmin === false || users === null) {
        return (
            <div className="my-24">
                <Spinner/>
            </div>
        )
    }

    let renderedUsers = users.map(elem=>{
        return (
            <tr className="border-b font-bold border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-3">{elem.name}</td>
                <td className="px-6 py-3">{elem.login}</td>
                <td className="px-6 py-3">{elem.email}</td>
                <td className="px-6 py-3">{elem.phone}</td>
                <td className="px-6 py-3">
                    <button onClick={()=>openNotifyBlock(elem._id)} className={`px-8 py-2 flex justify-center items-center text-white w-full font-bold rounded-md bg-blue-500 hover:bg-blue-400 transition`}>
                        <ChatAltIcon className={`w-5 h-5 mr-2`}/>
                        <span>Отправить</span>
                    </button>
                </td>
                <td className="px-6 py-3">
                    <button onClick={()=>deleteUser(elem._id)} className={`px-8 py-2 flex justify-center items-center text-white w-full font-bold rounded-md bg-red-500 hover:bg-red-400 transition`}>
                        <TrashIcon className={`w-5 h-5 mr-2`}/>
                        <span>Удалить</span>
                    </button>
                </td>
            </tr>
        )
    })

    let openNotifyBlock = (id)=>{
        console.log(id)
        setUserId(id)
        setShowNBlock(true)
    }

    let createUser = async(e)=>{
        e.preventDefault()
        let form = e.target
        let data = []
        form.querySelectorAll('input').forEach(input=>{
            data.push(input.value)
        })
        let userData = {
            name: data[0],
            login: data[1],
            email: data[2],
            phone: data[3],
            pass: data[4],
        }
        console.log(userData)
        let res = await api.registerUser(userData)
        let {message} = res.data
        if (message == "User registered successfully!"){
            swal('Успех', 'Вы создали нового пользователя', 'success')
            location.href = '/admin'
        } else {
            swal('Упс', 'Пользователь с такой почтой или логином уже существует', 'info')
        }
    }
    let deleteUser = async(id)=>{
        let res = await api.deleteUser(id)
        console.log(res.data)
        if (res.data.message == "OK"){
            swal('Успех', 'Вы удалили пользователя', 'success')
            location.href = '/admin'
        }
    }
    let sendNotify = async(e)=>{
        e.preventDefault()
        let form = e.target
        let data = []
        form.querySelectorAll('input').forEach(input=>{
            data.push(input.value)
        })
        let notifyData = {
            title: data[0],
            text: data[1],
            userId: userId
        }
        console.log(notifyData)
        let res = await api.sendNotify(notifyData)
        let {message} = res.data
        if (message == "OK"){
            swal('Успех', 'Вы отправили уведомление', 'success')
        } else {
            swal('Упс', 'Что-то пошло не так...', 'info')
        }
        setShowNBlock(false)
    }

    return (
        <>
            <Head>
                <title>Админ панель</title>
            </Head>
            <main className="px-44">
                {/*Navbar*/}
                <Navbar activeLink={'main'} userData={userData}/>
                <div className="my-12">
                    <h1 className="text-gray-900 font-bold text-3xl">Админ панель</h1><br/>
                    <div>
                        <table className="min-w-max w-full table-auto">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Имя</th>
                                <th className="py-3 px-6 text-left">Логин</th>
                                <th className="py-3 px-6 text-left">Почта</th>
                                <th className="py-3 px-6 text-left">Номер телефона</th>
                                <th className="py-3 px-6 text-left">Отправить уведомление</th>
                                <th className="py-3 px-6 text-left">Удалить пользователя</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {renderedUsers}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={`${showNotifyBlock ? `` : `hidden`}`}>
                    <h1 className={`text-2xl font-bold text-gray-900 mb-10`}>Отправка уведомления</h1>
                    <form onSubmit={(e)=>sendNotify(e)} className={`mb-24`}>
                        <input type="text" placeholder={`Введите заголовок`} className={`px-4 mr-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}/>
                        <input type="text" placeholder={`Введите текст`} className={`px-4 mr-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}/>
                        <button className={`px-8 py-2 flex justify-center items-center text-white w-1/4 mt-5 font-bold rounded-md bg-blue-500 hover:bg-blue-400 transition`}>
                            <PaperAirplaneIcon className={`w-5 h-5 mr-2`}/>
                            <span>Отправить</span>
                        </button>
                    </form>
                </div>

                <h1 className={`text-2xl font-bold text-gray-900 mb-10`}>Создание пользователя</h1>
                <form onSubmit={(e)=>createUser(e)} className={`mb-24`}>
                    <input type="text" placeholder={`Введите имя`} className={`px-4 mr-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}/>
                    <input type="text" placeholder={`Введите логин`} className={`px-4 mr-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}/>
                    <input type="email" placeholder={`Введите почту`} className={`px-4 mr-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}/>
                    <input type="number" placeholder={`Введите номер телефона`} className={`px-4 mr-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}/>
                    <input type="password" placeholder={`Введите пароль`} className={`px-4 mr-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}/>
                    <button className={`px-8 py-2 flex justify-center items-center text-white w-1/4 mt-5 font-bold rounded-md bg-blue-500 hover:bg-blue-400 transition`}>
                        <PlusCircleIcon className={`w-5 h-5 mr-2`}/>
                        <span>Создать</span>
                    </button>
                </form>
            </main>
            {/*Footer of page*/}
            <Footer/>
        </>

    )
}