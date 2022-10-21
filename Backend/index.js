const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("hi")
})


app.listen(3001, () => {
    console.info("Server active on port 3001")
})