const mongoose = require("mongoose")

//schema for the ingredients that includes:
//the name, quantity, and the QR codes that some of 
//the fruits and vegetables have on their product stickers
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    codes: [{
        type: String
    }]
})

module.exports = mongoose.model("ingredients", schema)