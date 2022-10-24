const express = require("express")
const ingredientsRoutes = require("./ingredients")
const recipesRoutes = require("./recipes")

const router = express.Router()

router.use("/ingredients", ingredientsRoutes)
router.use("/recipes", recipesRoutes)

module.exports = router