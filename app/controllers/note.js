var Note=require('../models/note')
var Category = require('../models/category')

exports.save=function(req,res){
    var id=req.query.id
    var _note=req.body.note
    //评论
    if(id){
        Note.findById(id,function(err,note){
            if(!_note.nick){
                _note.nick="匿名"
            }
            var reply={
                nick:_note.nick,
                comment:_note.comment
            }
            note.reply.push(reply)
            note.save(function(err,note){
                if(err){
                    console.log(err);
                }
                res.redirect('/note/detail/'+id);
                })
        })
    }
    else{
        _note.content=_note.content.replace(/\r\n/g,"<br><p>");//处理换行符
        var note=new Note(_note)
        var categoryName=note.categoryName

        var category=new Category({
              name:categoryName,
              notes:[note._id]
            })


        Category.findByName(categoryName, function(err, categorynew) {
            if(categorynew){
              categorynew.notes.push(note._id)
              categorynew.save(function(err, catetory) {
                note.save(function(err, note) {
                    res.redirect('/note')
                })
              })
    
            }else{
            category.save(function(err, category) {
              note.category=category._id
              note.save(function(err, note) {
                res.redirect('/note')
              })
            })
            }

        })
           
    }
}

//列表页
exports.list=function(req,res){
    var count=5
    var page=parseInt(req.query.p)-1||0
    var id=req.query.category
    var index=page*count
    var cateresults=[]
    //分类查找
    if(id){
        Category  
        .find({_id:id})
        .populate({
            path:'notes'
        })
        .exec(function(err,categories){
            if(err){
                console.log(err)
            }
            var category=categories[0] || {}
            var notes=category.notes || []
            Category
            .find({})
            .sort({'_id':-1})
            .exec(function(err,categories){

                if(err){
                  console.log(err)
                }
            var results = notes.slice(index, index+count)
            var rlength=notes.length
            var totalp=Math.ceil(rlength/count)
            res.render('note',{
                title:'前端笔记',
                notes:results,
                categories:categories,
                totalp:totalp,
                fenlei:id,
                currentPage:parseInt(page)+1
            })
          }) 
    })
    }            
    else{
    Note
    .find({})
    .sort({'_id':-1})
    .exec(function(err,notes){

        if(err){
          console.log(err)
        }
        Category
        .find({})
        .sort({'_id':-1})
        .exec(function(err,categories){

            if(err){
              console.log(err)
            }
            var results = notes.slice(index, index+count)
            var rlength=notes.length
            var totalp=Math.ceil(rlength/count)
            res.render('note',{
                title:'前端笔记',
                notes:results,
                categories:categories,
                totalp:totalp,
                fenlei:false,
                currentPage:parseInt(page)+1
            })  
        })
    }) 
    }   

}

//详情页
exports.detail=function(req,res){
  var id=req.params.id
  
  Note.findById(id,function(err,note){
            res.render('noteDetail',{
              title:'前端笔记',
              note:note
            })

    })
}