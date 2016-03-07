var Mood=require('../models/mood')


exports.save=function(req,res){
    var _mood=req.body.mood
    var mood=new Mood(_mood)
    mood.save(function(err,mood){
        if(err){
             console.log(err)
        }
         res.redirect('/mylife/mood')
    })

}

//列表页
exports.list=function(req,res){
    var count=10
    var page=parseInt(req.query.p)-1||0
    var index=page*count
    Mood
    .find({})
    .sort({'_id':-1})
    .exec(function(err,moods){

        if(err){
          console.log(err)
        }
        var results = moods.slice(index, index+count)
        var rlength=moods.length
        var totalp=Math.ceil(rlength/count)
        console.log(totalp)
        res.render('mylifeMood',{
            title:'我的',
            moods:results,
            totalp:totalp,
            currentPage:parseInt(page)+1
        })  

    })    

}

