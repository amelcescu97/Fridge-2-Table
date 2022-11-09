const express = require("express")
const fetch = require("node-fetch")
const recipeModel = require("../../models/recipes")

const {SPOONKEY} = process.env

const router = express.Router()

router.post("/:spoonid", async (req, res) => {
    try {
        const {spoonid} = req.params

        const response = await fetch(`https://api.spoonacular.com/recipes/${spoonid}/information?apiKey=${SPOONKEY}`)
        if (!response.ok) {
            return res.status(500).json({
                message: "error connecting to external api"
            })
        }
        const {title, image, ...raw} = await response.json()
        
        const newFavorite = await recipeModel.create({
            spoonid,
            title, 
            image, 
            raw
        })
        res.json(newFavorite)
    } catch (error) {
        console.error(error)   
        res.sendStatus(500)
    }
})

router.get("/", async (req, res) => {
    const favorites = await recipeModel.find({})
    res.json(favorites)
})

router.delete("/:spoonid", async (req, res) => {})

module.exports = router