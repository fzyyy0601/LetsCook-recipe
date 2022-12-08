const express = require('express')

const RecipeCtrl= require('../controllers/recipe-ctrl')

const router = express.Router()

router.get('/random',RecipeCtrl.getRandom)
router.get('/recipe/:id',RecipeCtrl.getRecipeById)
router.post('/getRecipe', RecipeCtrl.getRecipe)

module.exports = router