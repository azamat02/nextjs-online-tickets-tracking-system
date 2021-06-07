import pkg from "mongoose";
const {Schema, model} = pkg

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
})

export default model('Action', schema)