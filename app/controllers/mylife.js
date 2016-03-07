var Mood=require('../models/mood')
var Diary=require('../models/diary')

//列表页
exports.list=function(req,res){
    Mood
    .find({})
    .sort({'_id':-1})
    .exec(function(err,moods){

        if(err){
          console.log(err)
        }
        var resultsm = moods.slice(0, 4)
            Diary
            .find({})
            .sort({'_id':-1})
            .exec(function(err,moods){

            if(err){
              console.log(err)
            }
            var resultsd = moods.slice(0, 2)

            res.render('mylife',{
                title:'我的',
                moods:resultsm,
                diaries:resultsd
            })  

        }) 
    })    

}

