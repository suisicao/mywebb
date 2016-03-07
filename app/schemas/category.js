var mongoose=require('mongoose')
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var CategorySchema=new Schema({
    name:String,
    notes:[{type:ObjectId,ref:'Note'}],
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        }
    }
})

CategorySchema.pre('save',function(next){//每次存储之前都会调用这个方法

        this.meta.createAt=Date.now()

    next()
})
CategorySchema.statics={

    fetch:function(cb){

        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)//执行回调方法
    },
    findById:function(id,cb){

        return this
            .findOne({_id:id})
            .exec(cb)
    },
    findByName:function(name,cb){

        return this
            .findOne({name:name})
            .exec(cb)
    }
}

module.exports=CategorySchema