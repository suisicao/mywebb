var mongoose=require('mongoose')
var DiarySchema=new mongoose.Schema({
    title:String,
    content:String,
    reply:[{
        nick:String,
        comment:String, 
        createAt:{
            type:Date,
            default:Date.now()
        }
    }],
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        }
}
})

DiarySchema.pre('save',function(next){//每次存储之前都会调用这个方法

        this.meta.createAt=Date.now()  
         next()
})
DiarySchema.statics={

    fetch:function(cb){

        return this
            .find({})
            .sort('meta.createAt')
            .exec(cb)//执行回调方法
    },
    findById:function(id,cb){

        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports=DiarySchema