var Diary=require('../models/diary')


exports.save=function(req,res){
    var id=req.query.id
    var _diary=req.body.diary
    //仅储存评论
    if(id){
        Diary.findById(id,function(err,diary){
            if(!_diary.nick){
                _diary.nick="匿名"
            }
            var reply={
                nick:_diary.nick,
                comment:_diary.comment
            }
            diary.reply.push(reply)
            diary.save(function(err,diary){
                if(err){
                    console.log(err);
                }
                res.redirect('/mylife/diary/'+id);
                })
        })
    }else{
    _diary.content=_diary.content.replace(/\r\n/g,"<br><p>");//处理换行符
    var diary=new Diary(_diary)
    diary.save(function(err,diary){
        if(err){
             console.log(err)
        }
         res.redirect('/mylife/diarylist')
    })
}
}

//列表页
exports.list=function(req,res){
    var count=5
    var page=parseInt(req.query.p)-1||0
    var index=page*count
    Diary
    .find({})
    .sort({'_id':-1})
    .exec(function(err,diaries){

        if(err){
          console.log(err)
        }
        var results = diaries.slice(index, index+count)
        var rlength=diaries.length
        var totalp=Math.ceil(rlength/count)
        res.render('mylifeDiarylist',{
            title:'我的',
            diaries:results,
            totalp:totalp,
            currentPage:parseInt(page)+1
        })  

    })    

}

//详情页
exports.detail=function(req,res){
  var id=req.params.id
  
  Diary.findById(id,function(err,diary){
            res.render('mylifeDiary',{
              title:'我的',
              diary:diary
            })

    })
}