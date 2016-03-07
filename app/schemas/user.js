var mongoose=require('mongoose')
var bcrypt=require('bcrypt-nodejs')//加密算法插件
var SALT_WORK_FACTOR=10
var UserSchema=new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,

    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        }
    }
})

UserSchema.pre('save',function(next){//每次存储之前都会调用这个方法
    var user=this
    this.meta.createAt=Date.now()

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)

            bcrypt.hash(user.password, salt,null,function(err, hash) {
              if (err) return next(err)
                  user.password = hash
              next()
          })
    })
})

UserSchema.methods={

    comparePassword:function(_password,cb){

        bcrypt.compare(_password,this.password,function(err,isMatch){
            if(err) return cb(err)
                cb(null,isMatch)
        })
    }
}

UserSchema.statics={

    fetch:function(cb){

        return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb)//执行回调方法
        },
    findByName: function(_name, cb) {
        return this
        .findOne({
            name: _name
        })
        .exec(cb)
        }   
    }

    module.exports=UserSchema