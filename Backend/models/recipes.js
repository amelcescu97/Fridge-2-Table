const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    spoonid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("recipes", schema)