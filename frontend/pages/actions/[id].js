import Head from "next/head";
import {
    CashIcon,
    ChevronDownIcon, ChevronRightIcon,
    ClockIcon,
    FolderIcon,
    LocationMarkerIcon,
    UserGroupIcon
} from "@heroicons/react/outline";
import Router, {useRouter} from "next/router";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import {useEffect, useState} from "react";
import {act} from "react-dom/test-utils";
import axios from "axios";
import Spinner from "../../components/spinner/spinner";


export default function Action({userData, actionJson}) {
    const router = useRouter()
    const id = router.query.id
    const [action, setAction] = useState(actionJson)

    if (!action) {
        return (
            <div className="my-24">
                <Spinner width={44} height={44}/>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Главная страница</title>
            </Head>
            <main className="px-44">
                {/*Navbar*/}
                <Navbar activeLink={'main'} userData={userData}/>

                {/*Header*/}
                <header>
                    <div className="grid grid-cols-2 mt-10 mb-10 border-t-4 border-b-4 border-gray-800 py-10">
                        <div className="flex justify-center">
                            <img src={action.img} className="w-1/2"/>
                        </div>
                        <div className="px-8 pt-4">
                            <h1 className="text-5xl font-bold text-gray-900">{action.title}</h1>
                            <p className="mt-10 text-xl font-bold text-gray-600 w-2/3">
                                {action.description}
                            </p>
                            <div className="flex justify-between items-end mt-5 text-green-600 mt-10">
                                <h1 className="flex items-center text-xl font-bold ">
                                    <ClockIcon className="w-8 h-8 mr-1"/>
                                    <span>{action.date}</span>
                                </h1>
                                <h1 className="flex items-center text-xl font-bold ">
                                    <LocationMarkerIcon className="w-8 h-8 mr-1"/>
                                    <span>{action.location}</span>
                                </h1>
                                <h1 className="flex items-center text-xl font-bold ">
                                    <CashIcon className="w-8 h-8 mr-1"/>
                                    <span>{action.cost} &#8376;</span>
                                </h1>
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

Action.getInitialProps = async (ctx)=>{
    let id = ctx.query.id
    let res = await axios.get(`http://localhost:4200/api/actions/${id}`)
    return {
        actionJson: res.data
    }
}
