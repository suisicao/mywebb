var mongoose = require('mongoose')
var Category = mongoose.model('Category')


//admin post movie
exports.save=function(req,res){

    var _category=req.body.catetory
    var category=new Category(_category);
    category.save(function(err,movie){
        if(err){
            console.log(err);
        }
        res.redirect('/admin/catetorylist');
    }); 
}

//列表页
exports.list=function(req,res){

    Catetory.fetch(function(err,catetories){

        if(err){
            console.log(err)
        }
        res.render('catetorylist',{
            title:'imooc分类列表页',
            catetories:catetories
        })      

    })

}



