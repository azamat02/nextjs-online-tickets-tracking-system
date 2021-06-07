import Action from "../models/action.js";
import colors from "colors";

export const getAllActions = async (req, res) =>{
    const actions = await Action.find({})

    res.status(200).json(actions)
}

export const getOneAction = async (req, res) =>{
    const actionId = req.params.id;
    const action = await Action.findById(actionId).catch(err=>{
        console.log(colors.red(`Action with id ${actionId} not found`))
        res.status(404).json({
            "message": "Not found"
        })
    });

    res.status(200).json(action)
}

export const createAction = async (req, res) => {
    const action = new Action(req.body)

    await action.save()
    res.status(200)
    res.json({
        "message": "OK"
    })
}