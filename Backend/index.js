require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)

app.get("/", (req, res) => {
    res.send("hi")
})

app.listen(3001, () => {
    console.info("Server active on port 3001")
})

mongoose.connect("mongodb://localhost:27017/fridge-2-table")