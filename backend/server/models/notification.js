import pkg from "mongoose";
const {Schema, model} = pkg

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    }
})

export default model('Notification', schema)