import Head from "next/head";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../../components/spinner/spinner";
import {
    CashIcon,
    ChevronRightIcon,
    ClockIcon,
    LightBulbIcon,
    LightningBoltIcon,
    LocationMarkerIcon
} from "@heroicons/react/outline";
import Router from "next/router";
import ApiService from "../../services/apiService";


export default function AllActions({userData}) {
    const [allActions, setAllActions] = useState(null)
    const [activeCategory, setActiveCategory] = useState('all')
    let api = new ApiService()

    useEffect(()=>{
        if (allActions === null) {
            (
                async ()=>{
                    let res = await api.getAllActions()
                    setAllActions(res.data)
                }
            )();
        }
    })

    if (!allActions) {
        return (
            <div  className="mt-44">
                <Spinner width={44} height={44}/>
            </div>
        )
    }

    let renderedActions = allActions.map(elem=>{
        let item = (
            <div className="rounded-md px-12 py-8 mt-10 shadow-lg border-2 w-full">
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold text-gray-900 py-2 flex items-center">
                            <span>
                                {elem.title}
                            </span>
                        </h1>
                    </div>
                    <div className="flex justify-between items-end mt-5 text-gray-600">
                        <h1 className="flex items-center text-xl font-bold ">
                            <ClockIcon className="w-8 h-8 mr-1"/>
                            <span>{elem.date}</span>
                        </h1>
                        <h1 className="flex items-center text-xl font-bold ">
                            <LocationMarkerIcon className="w-8 h-8 mr-1"/>
                            <span>{elem.location}</span>
                        </h1>
                        <h1 className="flex items-center text-xl font-bold ">
                            <CashIcon className="w-8 h-8 mr-1"/>
                            <span>{elem.cost} &#8376;</span>
                        </h1>
                        <button onClick={()=>Router.push(`/actions/${elem._id}`)} className="bg-green-500 px-4 py-2 rounded-md transition hover:bg-green-400 text-white font-bold flex items-center">
                            <span>Подробнее</span>
                            <ChevronRightIcon className="w-5 h-5 ml-2"/>
                        </button>
                    </div>
                </div>
            </div>
        )
        if (activeCategory !== 'all') {
            if (elem.category == activeCategory) {
                return item
            }
        } else {
            return item
        }
    });


    return (
        <>
            <Head>
                <title>Все события</title>
            </Head>
            <main className="px-44">
                {/*Navbar*/}
                <Navbar activeLink={'main'} userData={userData}/>
                <header>
                    <div className="grid grid-cols-2">
                        <div>
                            <img src="https://bit.ly/2Ruk5Dn" alt=""/>
                        </div>
                        <div className="flex items-center">
                            <h1 className="px-4 py-2 border-l-4 border-gray-900 text-5xl font-bold text-gray-900">
                                Все ближайшие события
                            </h1>
                        </div>
                    </div>
                </header>
                <hr/>
                <br/>
                {/*All action  */}
                <div className="mb-32">
                    <div className="flex justify-start">
                        <div className="w-3/4">
                            {renderedActions}
                        </div>
                        <div className="w-1/4 mt-10 ml-5 h-full rounded-md shadow-lg border-2 px-8 py-4">
                            <h1 className="text-2xl font-bold text-gray-900">Категории</h1>
                            <ul className="mt-4">
                                <li onClick={()=>{setActiveCategory('all')}} className="font-bold text-blue-500 my-2 cursor-pointer hover:underline">Все</li>

                                <li onClick={()=>{setActiveCategory('concert')}} className="font-bold text-blue-500 my-2 cursor-pointer hover:underline">Концерты</li>

                                <li onClick={()=>{setActiveCategory('performance')}} className="font-bold text-blue-500 my-2 cursor-pointer hover:underline">Спектакли</li>

                                <li onClick={()=>{setActiveCategory('training')}} className="font-bold text-blue-500 my-2 cursor-pointer hover:underline">Тренинги</li>

                                <li onClick={()=>{setActiveCategory('masterclass')}} className="font-bold text-blue-500 my-2 cursor-pointer hover:underline">Мастерклассы</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            {/*Footer of page*/}
            <Footer/>
        </>
    )
}