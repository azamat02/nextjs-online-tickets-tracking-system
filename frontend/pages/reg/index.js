import Head from "next/head";
import Navbar from "../../components/navbar/navbar";
import Link from "next/link";
import {useEffect, useState} from "react";
import Spinner from "../../components/spinner/spinner";
import axios from "axios";
import swal from "sweetalert";
import Router from "next/router";
import Footer from "../../components/footer/footer";
import ApiService from "../../services/apiService";

export default function ReqPage({userData}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [spinner, setSpinner] = useState(null)
    let api = new ApiService()

    // Errors
    const [emailErr, setEmailErr] = useState(false)
    const [nameErr, setNameErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const [phoneErr, setPhoneErr] = useState(false)
    const [loginErr, setLoginErr] = useState(false)

    let errorClass = 'ring-2 ring-red-500'
    let blockedButton = 'bg-gray-400 hover:bg-gray-400'

    useEffect(()=>{
        if (userData !== null){
            console.log(`User data: ${userData}`)
            if (userData !== false){
                swal('Упс','Вы уже зашли в свой аккаунт','info')
                Router.push('/')
            }
        }
    })

    let changeData = (e, type)=>{
        let inputValue = e.target.value
        if (type === 'email'){
            if (inputValue.length < 6) {
                setEmailErr('Длина почты должна быть не менее 6 символов')
            } else {
                setEmailErr(false)
            }
            setEmail(inputValue)
        }
        if (type === 'name'){
            let nameCheck = /^[A-Za-zА-Яа-я]+$/;
            if (!nameCheck.test(inputValue)) {
                setNameErr('Имя должно содержать только буквы.')
            } else {
                setNameErr(false)
            }
            setName(inputValue)
        }
        if (type === 'login'){
            if (inputValue.length < 6) {
                setLoginErr('Длина логина должна быть не менее 6 символов')
            } else {
                setLoginErr(false)
            }
            setLogin(inputValue)
        }
        if (type === 'phone'){
            setPhone(inputValue)
        }
        if (type === 'pass'){
            if (inputValue.length < 6) {
                setPassErr('Длина пароля должна быть не менее 6 символов')
            } else {
                setPassErr(false)
            }
            setPass(inputValue)
        }
    }

    let submit = async (e) =>{
        e.preventDefault()

        if (email.length != 0 && name.length != 0 && login.length !=0 && pass.length != 0 && pass.length !=0){

            let userData = {
                login: login,
                password: pass,
                name: name,
                email: email,
                phone: phone
            }

            setSpinner(
                <div className="m-24">
                    <Spinner/>
                </div>
            )

            let res = await api.registerUser(userData)
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

    let emailErrBlock = emailErr ? (<p className={`text-red-500 font-bold my-1`}>{emailErr}</p>) : null
    let nameErrBlock = nameErr ? (<p className={`text-red-500 font-bold my-1`}>{nameErr}</p>) : null
    let passErrBlock = passErr ? (<p className={`text-red-500 font-bold my-1`}>{passErr}</p>) : null
    let loginErrBlock = loginErr ? (<p className={`text-red-500 font-bold my-1`}>{loginErr}</p>) : null
    let isAnyErr = !emailErr && !nameErr && !passErr && !loginErr

    let regBlock = spinner ?? (
        <form onSubmit={(e)=>submit(e)}>
            <input type="text"
                   onChange={(e)=>changeData(e,'name')}
                   className={`${nameErr ? errorClass : ``} px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                   placeholder="Введите имя"/>
            {nameErrBlock}

            <input type="text"
                   onChange={(e)=>changeData(e,'login')}
                   className={`${loginErr ? errorClass : ``} px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                   placeholder="Введите логин"/>
            {loginErrBlock}

            <input type="email"
                   onChange={(e)=>changeData(e,'email')}
                   className={`${emailErr ? errorClass : ``} px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                   placeholder="Введите почту"/>
            {emailErrBlock}

            <input type="number"
                   onChange={(e)=>changeData(e,'phone')}
                   className={`px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                   placeholder="Введите номер телефона"/>

            <input type="password"
                   onChange={(e)=>changeData(e,'pass')}
                   className={`${passErr ? errorClass : ``} px-4 py-3 mt-5 placeholder-gray-600 w-full font-medium rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                   placeholder="Введите пароль"/>
            {passErrBlock}

            <button disabled={isAnyErr ? false : true} className={`${isAnyErr ? `bg-blue-500 hover:bg-blue-400`: blockedButton} w-full block mt-5 px-10 py-3 rounded font-bold text-white transition`}>
                Регистрация
            </button>
            <Link href="/login">
                <p className="mt-2 cursor-pointer text-blue-500 underline text-center">Есть аккаунт? Войти</p>
            </Link>
        </form>
    )

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
                            {regBlock}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}