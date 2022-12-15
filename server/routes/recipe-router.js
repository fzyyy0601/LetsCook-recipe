const express = require('express')

const RecipeCtrl= require('../controllers/recipe-ctrl')

const router = express.Router()

router.get('/random',RecipeCtrl.getRandom)
router.get('/getLongestTimeRecipe', RecipeCtrl.getLongestTimeRecipe)
router.post('/getStrictRecipe', RecipeCtrl.getStrictRecipe)
router.post('/getRecipe', RecipeCtrl.getRecipe)


module.exports = router