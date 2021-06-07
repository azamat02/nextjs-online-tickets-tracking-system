import express from 'express'
import router from './router.js'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app = express()

async function start() {
    const mongoConfig = {
        useNewUrlParser: true,
        useFindAndModify: false
    }
    const mongoUrl = 'mongodb+srv://azamat:azamat2341@cluster0.k10zx.mongodb.net/test'

    try{
        // Connect DB
       await mongoose.connect(mongoUrl, mongoConfig)

        // Setting port
        const PORT = process.env.PORT ?? 4200

        app.use(cors({origin:true,credentials: true}));
        app.use(express.json())
        app.use(express.urlencoded({extended: false}))
        app.use(cookieParser())

        // Setting routes
        app.use(router)

        app.listen(PORT, ()=>{
            console.log(`Server started on ${PORT} port...`)
        })
    }catch (err){
        console.log(err)
    }
}

start()
