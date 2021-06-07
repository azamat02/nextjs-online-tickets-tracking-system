import Head from "next/head";
import Navbar from "../components/navbar/navbar";
import {ChevronDownIcon, ClockIcon, FolderIcon, LocationMarkerIcon, UserGroupIcon} from "@heroicons/react/outline";


export default function Home({userData}) {
    return (
        <>
            <Head>
                <title>Главная страница</title>
            </Head>
            <main className="px-44">
                {/*Navbar*/}
                <Navbar activeLink={'main'} userData={userData}/>
                {/*Header*/}
                <header className="mt-24 h-96 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <h1 className="text-5xl font-bold text-gray-900">
                            Онлайн сервис по отслеживанию билетов на мероприятия
                        </h1>
                    </div>
                    <div>
                        <img src="https://bit.ly/34GKl0b" alt=""/>
                    </div>
                </header>
                {/*Action button*/}
                <a href="#advantages">
                    <div className="flex justify-center mt-24 cursor-pointer">
                        <ChevronDownIcon className="w-20 h-20 text-gray-800"/>
                    </div>
                </a>
                <div className="divide-y-2">
                    {/*Advantages section*/}
                    <div className="my-44" id={`advantages`}>
                        <h1 className="my-10 text-5xl font-bold text-gray-800 text-center">Предоставляемые возможности</h1>
                        <div className="grid grid-cols-3 mt-12 gap-8">
                            <div className="text-center rounded-lg shadow-xl p-4 border-2">
                                <UserGroupIcon className="w-16 h-16 inline text-blue-500"/>
                                <p className="font-bold text-xl tex-gray-900">Информированность</p>
                                <p className="text-md mt-2 font-medium text-gray-500">Ознакомление со всеми громкими событиями в городе.</p>
                            </div>
                            <div className="text-center rounded-lg shadow-xl p-4 border-2">
                                <FolderIcon className="w-16 h-16 inline text-blue-500"/>
                                <p className="font-bold text-xl tex-gray-900">Осведомленность</p>
                                <p className="text-md mt-2 font-medium text-gray-500">Просмотр данных о проданных и поступивших билетах.</p>
                            </div>
                            <div className="text-center rounded-lg shadow-xl p-5 border-2">
                                <ClockIcon className="w-16 h-16 inline text-blue-500"/>
                                <p className="font-bold text-xl tex-gray-900">Экономия времени</p>
                                <p className="text-md mt-2 font-medium text-gray-500">Не нужно тратить время на отслеживание момента о поступлений билетов.</p>
                            </div>
                        </div>
                    </div>
                    {/*Nearest actions section*/}
                    <div className="my-44" id={`actions`}>
                        <h1 className="my-10 text-5xl font-bold text-gray-800 text-center">Ближайшие события</h1>
                        <div className="grid grid-cols-2 mt-12 gap-8">
                            <div className="rounded-lg grid grid-cols-3 shadow-xl border-2">
                                <div>
                                    <img src="https://bit.ly/3pkfnV7" alt=""/>
                                </div>
                                <div className="col-span-2 p-4">
                                    <div className="title text-gray-900 font-bold text-xl">
                                        Полина гагарина
                                    </div>
                                    <div className="title text-gray-600 flex mt-5 items-center font-bold text-xl">
                                        <ClockIcon className="w-7 h-7 mr-2"/>
                                        <span>3 июля в 19:00</span>
                                    </div>
                                    <div className="title text-gray-600 flex mt-5 items-center font-bold text-xl">
                                        <LocationMarkerIcon className="w-7 h-7 mr-2"/>
                                        <span>Crocus city hall</span>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg grid grid-cols-3 shadow-xl border-2">
                                <div>
                                    <img src="https://bit.ly/3cgqqJU" alt=""/>
                                </div>
                                <div className="col-span-2 p-4">
                                    <div className="title text-gray-900 font-bold text-xl">
                                        Imagine dragons
                                    </div>
                                    <div className="title text-gray-600 flex mt-5 items-center font-bold text-xl">
                                        <ClockIcon className="w-7 h-7 mr-2"/>
                                        <span>9 июля в 21:00</span>
                                    </div>
                                    <div className="title text-gray-600 flex mt-5 items-center font-bold text-xl">
                                        <LocationMarkerIcon className="w-7 h-7 mr-2"/>
                                        <span>Grand hall</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}