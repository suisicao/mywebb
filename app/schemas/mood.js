var mongoose=require('mongoose')
var MoodSchema=new mongoose.Schema({
    content:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        }
}
})

MoodSchema.pre('save',function(next){//每次存储之前都会调用这个方法

        this.meta.createAt=Date.now()  
         next()
})
MoodSchema.statics={

    fetch:function(cb){

        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)//执行回调方法
    }
}

module.exports=MoodSchema