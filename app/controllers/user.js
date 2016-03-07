var User=require('../models/user')


/*exports.signup=function(req,res){

 var _user=req.body.user//这是一个集合
    var name=_user.name
    User.findByName(name,function(err,user){
        if(err){
            console.log(err)
        }
        else{
            var user=new User(_user)
            user.save(function(err,user){
                if(err){
                    console.log(err)
                }
                res.redirect('/')
            })
        }
    })


}*/

//sign in

exports.signin=function(req,res){
    var _user=req.body.user//这是一个集合
    var name=_user.name
    var password=_user.password

    User.findByName(name,function(err,user){
        console.log(user)
        if(err){
            console.log(err)
        }
        if(!user){
            res.json({error:1})
            return false;
        }
       user.comparePassword(password,function(err,isMatch){

        if(err){
            console.log(err)
        }
        if(isMatch){
            req.session.user=user
            res.json({success:1})
        }
        if(!isMatch){
            res.json({error:2})
        }

       })
    })

}

exports.signinRequired=function(req,res,next){

    var user=req.session.user
    if(!user){
        return res.redirect('/')
    }

    next()
}