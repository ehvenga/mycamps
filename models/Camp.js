const mongoose = require("mongoose")

const CampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const CampModel = mongoose.model('Camp', CampSchema)
module.exports = CampModel