const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    spoonid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    favorited: {
        type: Boolean,
        default: true
    },
    raw: {
        type: Object,
    }
})

module.exports = mongoose.model("recipes", schema)