var mongoose=require('mongoose')
var MoodSchema=require('../schemas/mood')
var Mood=mongoose.model('Mood',MoodSchema)

module.exports=Mood

