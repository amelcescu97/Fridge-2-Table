const express = require("express")
const fetch = require("node-fetch")
const recipeModel = require("../../models/recipes")

const {SPOONKEY} = process.env

const router = express.Router()

router.post("/:spoonid", async (req, res) => {
    try {
        const {spoonid} = req.params

        const existingFavorite = await recipeModel.findOne({spoonid})
        if (existingFavorite) {
            existingFavorite.favorited = true
            await existingFavorite.save()

            res.json(existingFavorite)
            return 
        }

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
    const favorites = await recipeModel.find({favorited: true})
    res.json(favorites)
})

router.delete("/:spoonid", async (req, res) => {
    try {
        const {spoonid} = req.params

        const existingFavorite = await recipeModel.findOne({spoonid})
        if (!existingFavorite) {
            res.status(404).json({message: "Favorite recipe not found"})
            return 
        }

        existingFavorite.favorited = false
        await existingFavorite.save()

        res.json(existingFavorite)
    } catch (error) {
        console.error(error)   
        res.sendStatus(500)
    }
})

module.exports = router