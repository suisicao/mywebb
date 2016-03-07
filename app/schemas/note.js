var mongoose=require('mongoose')
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var NoteSchema=new Schema({
    title:String,
    content:String,
    categoryName:String,
    category:{
        type:ObjectId,
        ref:'Category'
    },
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

NoteSchema.pre('save',function(next){//每次存储之前都会调用这个方法

        this.meta.createAt=Date.now()  
         next()
})
NoteSchema.statics={

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

module.exports=NoteSchema