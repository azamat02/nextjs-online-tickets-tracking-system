import Notification from "../models/notification.js";
import colors from "colors";

export const getAllNotifications = async (req, res) =>{
    const notifications = await Notification.find({})

    res.status(200).json(notifications)
}

export const getOneNotificationById = async (req, res) =>{
    const notId = req.params.id;
    const not = await Notification.findById(notId).catch(err=>{
        console.log(colors.red(`Notification with id ${notId} not found`))
        res.status(404).json({
            "message": "Not found"
        })
    });

    res.status(200).json(not)
}

export const getNotificationsByUserId = async (req, res) =>{
    const userId = req.params.id;
    const not = await Notification.find({userId: userId}).catch(err=>{
        console.log(colors.red(`Notification not found`))
        res.status(404).json({
            "message": "Not found"
        })
    });

    res.status(200).json(not)
}

export const createNotification = async (req, res) => {
    const notification = new Notification(req.body)

    let date = new Date(Date.now()+(3600000*6))
    let stringDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    notification.date = stringDate

    await notification.save()
    res.status(200)
    res.json({
        "message": "OK"
    })
}

