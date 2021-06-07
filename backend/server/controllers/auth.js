import User from "../models/user.js";
import colors from "colors";
import jwt from 'jsonwebtoken'
import cryptoJs from 'crypto-js'

const KEY = "secret"

export const isUserAuth = async (req, res)=>{
    let token = req.cookies.token

    try {
        jwt.verify(token, KEY, async function (err, decode) {
            if (!err && decode){
                let userId = decode.id

                let findedUser = await User.findById(userId)
                let jsonUser = {
                    name: findedUser.name,
                    email: findedUser.email,
                    login: findedUser.login
                }

                res.status(200).json({
                    userData: jsonUser,
                    message: "Authenticated"
                })
                return
            }

            res.status(200).json({
                message: "Not authenticated"
            })
        })
    } catch (err){
        console.log("500| Internal server error ")
    }
}

export const loginUser = async (req, res)=>{
    const user = req.body

    const findedUser = await User.find({login: user.login}).exec()

    if (findedUser.length === 0){
        res.json({
            message: `Invalid password or login!`
        })
        return
    }

    let userData = findedUser[0]
    let pass = cryptoJs.AES.decrypt(userData.password, 'secret').toString(cryptoJs.enc.Utf8);

    if (pass === user.password) {
        res.status(200)

        let token = jwt.sign({
            id: userData.id,
        }, KEY, {expiresIn: '1hr'})
        res.cookie("token", token, {expire: new Date()+9999})
        res.json({
            message: "You are logged in!"
        })
        return
    } else {
        res.status(200)
        res.json({
            message: "Invalid password or login!"
        })
    }
}

export const registerUser = async (req, res)=>{
    let user = req.body;

    const findedUser = await User.find(
        {
            $or: [
                { 'login': user.login },
                { 'email': user.email }
            ]
        }
    )

    if (findedUser.length === 0){
        // Encrypting password
        let updatedPass = cryptoJs.AES.encrypt(user.password, 'secret').toString();
        user.password = updatedPass

        const mongoUser = new User(user)
        mongoUser.save()
        res.json({
            "message": "User registered successfully!"
        })
        return
    } else {
        console.log(colors.red(`User with current login or email is already registered!`))
        res.json({
            "message": `User with current login or email is already registered!`
        })
        return
    }
}

export const logoutUser = async (req, res)=>{
    res.clearCookie('token')
    res.json({
        message: "Logout success!"
    })
}