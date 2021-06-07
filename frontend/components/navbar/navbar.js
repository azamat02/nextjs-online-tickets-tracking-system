import Link from 'next/link'
import {useState} from "react";
import Spinner from "../spinner/spinner";
import axios from "axios";
import {LogoutIcon} from "@heroicons/react/outline";

export default function Navbar({activeLink, userData}) {
    let links

    if (userData === null) {
        return <Spinner/>
    }

    let logout = async () => {
        await axios.get('http://localhost:4200/api/logout', { withCredentials: true })
        location.href = '/'
    }

    if (userData !== false) {
        links = (
            <>
                <a href={`/profile`}>
                    <li className="cursor-pointer mx-5 px-8 font-bold bg-blue-500 rounded-md text-white py-2 transition hover:bg-blue-400">
                        Личный кабинет
                    </li>
                </a>
                <li onClick={logout} className="cursor-pointer mx-1 flex items-center px-8 font-bold bg-blue-500 rounded-md text-white py-2 transition hover:bg-blue-400">
                    <LogoutIcon className="w-5 h-5 mr-2"/>
                    <span>Выйти</span>
                </li>
            </>
        )
    } else {
        links = (
            <a href={`/login`}>
                <li className="cursor-pointer mx-10 px-8 font-bold bg-blue-500 rounded-md text-white py-2 transition hover:bg-blue-400">
                    Войти
                </li>
            </a>
        )
    }



    return (
        <nav className="py-5 flex justify-between">
            <div className="flex items-center text-2xl bg">
                <a href={`/`}>
                    ONLINE TICKETS
                </a>
            </div>
            <ul className="flex items-center">
                <a href={`/`}>
                    <li className={`${activeLink === 'main' ? `text-blue-600`: `text-black`} hover:text-gray-600 transition cursor-pointer mx-10 font-bold`}>
                        Главная
                    </li>
                </a>
                <a href={`/actions`}>
                    <li className={`${activeLink === 'tickets' ? `text-blue-600`: `text-black`} hover:text-gray-600 transition cursor-pointer mx-10 font-bold`}>
                        События
                    </li>
                </a>
                {links}
            </ul>
        </nav>
    )
}