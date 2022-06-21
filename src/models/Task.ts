import mongoose, { Schema } from "mongoose";

const TaskShema: Schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: false
    }
})

export default mongoose.model('Task', TaskShema)