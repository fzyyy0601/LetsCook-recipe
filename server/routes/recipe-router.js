const express = require('express')

const RecipeCtrl= require('../controllers/recipe-ctrl')

const router = express.Router()

router.get('/random',RecipeCtrl.getRandom)
router.post('/getRecipe', RecipeCtrl.getRecipe)
router.get('/getLongestTimeRecipe', RecipeCtrl.getLongestTimeRecipe)

module.exports = router