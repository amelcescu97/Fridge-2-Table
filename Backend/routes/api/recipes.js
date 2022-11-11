const express = require("express")
const fetch = require("node-fetch")
const ingredientModel = require("../../models/ingredients")

const {SPOONKEY} = process.env

const router = express.Router()

router.get("/", async (req, res) => {
    const ingredients = await ingredientModel.find({quantity: {$gt: 0}})
    const ingredientList = [...ingredients]
    .map((ingredient) => ingredient.name)
    .join(",");

    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&apiKey=${SPOONKEY}`)
    if (!response.ok) {
        return res.status(500).json({
            message: "error connecting to external api"
        })
    }

    const data = await response.json();
    res.json(data)
})

module.exports = router