import mongoose from "mongoose"

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cords: [{type: Number}],
    departments: [
        {
            type: String
        }
    ],
    vacancy: {
        type: Number
    }
}, { timestamps: true })

export default mongoose.model("hospital", hospitalSchema)