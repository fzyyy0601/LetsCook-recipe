const mongoose= require('mongoose')
const Schema = mongoose.Schema
//var textSearch = require('mongoose-text-search')

const Recipe = new Schema(
    {
        url:{type:String, required:true},
        totaltime:{type:Number, required:true},
        ingredients:{type:[String], required: true},
        image:{type: String, required: true},
        source:{type:String, required: true},
        tag:{type:String, required: true},
        title:{type:String, required: true},
        instructions:{type: String, required: true}
    }
)
//Recipe.plugin(textSearch)

module.exports = mongoose.model("Model",Recipe,"test")
