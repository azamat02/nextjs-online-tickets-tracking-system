import Head from "next/head";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Spinner from "../components/spinner/spinner";
import {BellIcon, ChatAlt2Icon, IdentificationIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import ApiService from "../services/apiService";
import swal from "sweetalert";
import Router from "next/router";


export default function Profile({userData}) {
    const [notifications, setNotifications] = useState(null)
    let api = new ApiService()

    useEffect(()=>{
        if (notifications === null) {
            (
                async()=>{
                    let res = await api.getUserNotifications(userData.id)
                    console.log(res)
                    setNotifications(res.data)
                }
            )()
        }
    },[notifications])

    if (!userData || !notifications) {
        return (
            <div className="my-24">
                <Spinner width={44} height={44}/>
            </div>
        )
    }

    let renderedNotifications = notifications.map(elem=>{
        return (
            <div className={`px-4 py-2 my-2 rounded-md border-2`}>
                <p className={`font-bold`}>{elem.title}</p>
                <p className={`my-2`}>{elem.text}</p>
                <p className={`text-gray-600 font-bold text-right`}>{elem.date}</p>
            </div>
        )
    })

    return (
        <>
            <Head>
                <title>Личный кабинет</title>
            </Head>
            <main className="px-44">
                {/*Navbar*/}
                <Navbar activeLink={'main'} userData={userData}/>
                <header>
                    <div className="mt-10 mb-44">
                        <h1 className="text-4xl font-bold text-blue-600">
                            Личный кабинет
                        </h1>
                        <div className="mt-10 flex items-start">
                            <div className="w-2/3 rounded-md border-2 shadow-lg px-8 py-4">
                                <h1 className="flex items-center text-gray-900 border-b-2 border-gray pb-3g font-bold text-2xl">
                                    <IdentificationIcon className="text-green-500 w-8 h-8 mr-2"/>
                                    <span>
                                        Личная информация
                                    </span>
                                </h1>
                                <p className="py-4 text-xl font-bold text-gray-600">Имя: {userData.name}</p>
                                <p className="py-4 text-xl font-bold text-gray-600">Логин: {userData.login}</p>
                                <p className="py-4 text-xl font-bold text-gray-600">Почта: {userData.email}</p>
                                <p className="py-4 text-xl font-bold text-gray-600">Номер телефона: {userData.phone}</p>
                            </div>
                            <div className="w-1/3 ml-10  rounded-md border-2 shadow-lg px-8 py-4">
                                <h1 className="flex items-center text-gray-900 font-bold text-2xl">
                                    <BellIcon className="text-yellow-500 w-8 h-8 mr-2"/>
                                    <span>
                                        Уведомления
                                    </span>
                                </h1>
                                <div className="mt-4">
                                    {renderedNotifications}
                                    {notifications.length === 0 ? (<h1 className={`text-gray-500 font-bold`}>У вас нету уведомлений</h1>) : ``}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </main>
            {/*Footer of page*/}
            <Footer/>
        </>
    )
}

