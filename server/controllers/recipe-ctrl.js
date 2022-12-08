const Recipe = require('../models/recipe-model')

getRecipeById = async(req, res)=>{
    await Recipe.findOne({_id:req.params.id},(err,recipe)=>{
        if(err) return res.status(400).json({success: false, error:err})
        if(!recipe) return res.status.json({success:false, error:'Recipe Not Found'})
        return res.status(200).json({success:true, data:recipe})
    }).catch(err=>console.log(err))
}

getRecipeRegex = async(req, res)=>{
    await Recipe.aggregate([
        {
          '$match': {
            '$and': [
              {
                'totaltime': {
                  '$gt': 15, 
                  '$lt': 30
                }
              }, {
                'ingredients': {
                  '$regex': new RegExp('oil'), 
                  '$regex': new RegExp('celery')
                }
              }
            ]
          }
        }, {
          '$limit': 5
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
        return res.status(200).json({success:true, data:recipe})
      }).catch(error=>console.log(err))
}
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
      '$gt': req.body.minTime, 
      '$lt': req.body.maxTime
    }
  }else if(typeof req.body.maxTime !== 'undefined'){
    query_time = {
      '$gt': 15,
      '$lt': req.body.maxTime
    }
  }else if(typeof req.body.minTime !== 'undefined'){
    query_time ={
      '$gt': req.body.minTime,
      '$lt': 60
    }
  }
  // console.log(query_time)
  // console.log(req.body.minTime)
  // console.log(req.body.maxTime)
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
        '$limit': 5
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
      console.log(recipe[0])
      return res.status(200).json({success:true, data:recipe})
    }).catch(error=>console.log(error))
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
    getRecipeById,
    getRecipe
}
