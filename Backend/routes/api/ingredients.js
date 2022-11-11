const express = require("express")
const ingredientModel = require("../../models/ingredients")

const router = express.Router()

router.get('/', async (req, res) => {
    const ingredients = await ingredientModel.find({quantity: {$gt: 0}})
    res.json(ingredients)
})

router.post("/add", async (req, res) => {
    let { name, quantity = 1, code } = req.body
    name = name?.toLowerCase()
    quantity = +quantity

    if (code) {
        const existingIngredient = await ingredientModel.findOne({ codes: [code] })
        if (existingIngredient) {
            existingIngredient.quantity += quantity
            await existingIngredient.save()
            res.json(existingIngredient)
        } else if (name) {
            const existingIngredient = await ingredientModel.findOne({ name })
            if (existingIngredient) {
                existingIngredient.quantity += quantity
                existingIngredient.codes.push(code)
                await existingIngredient.save()
                res.json(existingIngredient)
            } else {
                const newIngredient = await ingredientModel.create({
                    name,
                    quantity,
                    codes: [code]
                })
                res.json(newIngredient)
            }
        } else {
            res.status(400).json({
                message: "Code doesn't exist in database"
            })
        }
    } else if (name) {
        const existingIngredient = await ingredientModel.findOne({ name })
        if (existingIngredient) {
            existingIngredient.quantity += quantity
            await existingIngredient.save()
            res.json(existingIngredient)
        } else {
            const newIngredient = await ingredientModel.create({ name, quantity })
            res.json(newIngredient)
        }
    } else {
        res.status(400).json({
            message: "Code or name is required"
        })
    }
})

router.post("/remove", async(req, res) => {
    let { name, quantity = 1, code } = req.body
    name = name?.toLowerCase()
    quantity = +quantity

    const existingIngredient = await ingredientModel.findOne({$or: [{name},{codes: [code]}]})
    if (!existingIngredient) {
        res.status(400).json({message: "Ingredient not found"})
        return
    }
    
    existingIngredient.quantity = Math.max(0, existingIngredient.quantity - quantity)
    await existingIngredient.save()
    res.json(existingIngredient)
})

module.exports = router