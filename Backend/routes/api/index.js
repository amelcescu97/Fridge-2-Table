const express = require("express")
const ingredientsRoutes = require("./ingredients")
const recipesRoutes = require("./recipes")
const favoritesRoutes = require("./favorites")

const router = express.Router()

router.use("/ingredients", ingredientsRoutes)
router.use("/recipes", recipesRoutes)
router.use("/favorites", favoritesRoutes)

module.exports = router