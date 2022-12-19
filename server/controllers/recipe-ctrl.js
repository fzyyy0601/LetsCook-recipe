const Recipe = require('../models/recipe-model')

// function to get get recipe, return mongodb search result
getRecipe = async(req, res)=>{
  var regex = req.body.material.map(function(k){return new RegExp(k); })
  var query_time
  var query_tag

  // query cuisine type
  if(typeof req.body.tag !== 'undefined') query_tag = req.body.tag
  else query_tag=""

  // query time 
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
  }else{
    query_time="";
  }

  // query database, and result sort in totaltime ascending order
  // return top 10 result
  await Recipe.aggregate([
      {
        '$match': {
          '$and': [
            {
              'totaltime': query_time
             }, {
               'ingredients':{'$in':regex}
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

// return random recipe
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

getStrictRecipe = async(req, res)=>{
  var regex = []
  for(var v of req.body.material){
    regex.push({'ingredients':new RegExp(v)})
  }
  console.log(regex)
  
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
  }else{
    query_time="";
  }

  if(query_time !== ""){
    regex.push({
      'totaltime': query_time
     })
  }
   if(query_tag !== ""){
    regex.push({
      'tag':query_tag
    }) 
   }
  
  await Recipe.aggregate([
      {
        '$match': {
           '$and':  regex
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
      return res.status(200).json({success:true, data:recipe})
    }).catch(error=>console.log(error))
}

module.exports={
    getRandom,
    getLongestTimeRecipe,
    getRecipe,
    getStrictRecipe
}
