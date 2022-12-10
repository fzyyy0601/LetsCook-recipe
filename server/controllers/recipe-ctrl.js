const Recipe = require('../models/recipe-model')
getRecipe = async(req, res)=>{
  console.log(req.body)
  var query_q = []
  console.log(req.body.material)
  for(var v of req.body.material){
      query_q.push(eval(('/' + v +'/i') ))
  }
  var query_time
  var query_tag
  if(typeof req.body.tag !== 'undefined') query_tag = req.body.tag
  else query_tag=""

  if(typeof req.body.minTime !== 'undefined' & typeof req.body.maxTime !== 'undefined'){
    query_time = {
      '$gt': parseInt(req.body.minTime), 
      '$lt': parseInt(req.body.maxTime)
    }
  }else if(typeof req.body.maxTime !== 'undefined'){
    query_time = {
      '$lt': parseInt(req.body.maxTime)
    }
  }else if(typeof req.body.minTime !== 'undefined'){
    query_time ={
      '$gt': parseInt(req.body.minTime)
    }
  }
  await Recipe.aggregate([
      {
        '$match': {
          '$and': [
            {
              'totaltime': query_time
            }, {
              'ingredients': {
                $in:query_q
              }
            },
            {
              'tag':query_tag
            }
          ]
        }
      }, {
        '$limit': 10
      }, {
          '$sort': {
            'totaltime': 1
          }
        }
    ],(err,recipe)=>{
      if(err) return res.status(400).json({success:false, error: err})
      if(!recipe.length){
          return res
                  .status(400)
                  .json({success: false, error:'Recipe Not Found'})
      }
      console.log(recipe)
      return res.status(200).json({success:true, data:recipe})
    }).catch(error=>console.log(error))
}

getLongestTimeRecipe = async(req, res)=>{
  //await Recipe.find().sort({totaltime:1}).limit(1) get the recipe with minimum time
  await Recipe.aggregate([{$sort: {totaltime: -1}}, {$limit:1}],(err,recipe)=>{
    if(err) return res.status(400).json({success:false, error: err})
    if(!recipe.length){
        return res
                .status(400)
                .json({success: false, error:'Recipe Not Found'})
    }
    return res.status(200).json({success:true, data:recipe})
  }).catch(err=>console.log(err))
}

getRandom= async(req, res)=>{
    await Recipe.aggregate([{$sample:{size :1}}],(err, recipe)=>{
      if(err) return res.status(400).json({success:false, error: err})
      if(!recipe.length){
          return res
                  .status(400)
                  .json({success: false, error:'Recipe Not Found'})
      }
      return res.status(200).json({success:true, data:recipe})
  }).catch(err=>console.log(err))
}

//get all recipes in the database
// getRecipes = async(req, res)=>{
//     await Recipe.find({},(err, recipe)=>{
//         if(err) return res.status(400).json({success:false, error: err})
//         if(!recipe.length){
//             return res
//                     .status(400)
//                     .json({success: false, error:'Recipe Not Found'})
//         }
//         return res.status(200).json({success:true, data:recipe})
//     }).catch(err=>console.log(err))
// }


module.exports={
    getRandom,
    getLongestTimeRecipe,
    getRecipe
}
