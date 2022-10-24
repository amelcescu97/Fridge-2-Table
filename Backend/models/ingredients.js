const mongoose = require("mongoose")

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