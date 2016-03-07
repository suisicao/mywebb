
var mongoose=require('mongoose')
var express=require('express')
var path=require('path')
var port=process.env.PORT||18080
var app=express()

var dburl ="mongodb://b7fb789b8571484f9cd1a501d4e78be7:62317983b6d8412789f2aee3cdb7efed@mongo.duapp.com:8908/HVuXQptRnocjoyZGfRuH"
mongoose.connect(dburl,{server: {auto_reconnect:true}})
mongoose.connection.on('close', function(){
mongoose.connect(dburl, {server:{auto_reconnect:true}});
});
mongoose.connection.on('error', function(error){
console.log('error + ' + error);
mongoose.disconnect();
});



var User=require('./app/controllers/user')
var Mood=require('./app/controllers/mood')
var Diary=require('./app/controllers/diary')
var myLife=require('./app/controllers/mylife')
var Note=require('./app/controllers/note')
app.locals.moment=require('moment')

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongodb')

app.set('views','./views/pages')
app.set('view engine','jade')
app.locals.pretty = true;//查看源代码不压缩
app.listen(port)

console.log("imooc start at port"+port)

app.use(express.static(path.join(__dirname, 'bower_components')))//静态资源路径
app.use(bodyParser.urlencoded({extended:true}))//解析body提交内容
app.use(cookieParser()) //存储用户名到session*/
/*app.use(session({ 
    secret: 'HVuXQptRnocjoyZGfRuH',
    store:new mongoStore({
        url:dburl,
        collection:'sessions',
        server:{auto_reconnect:true}
    })
}))

app.use(function(req,res,next){
    var _user=req.session.user
    app.locals.user=_user        
    return next()
        
})*/

//index page

app.get('/',function(req,res){
    res.render('index',{
        title:'首页'
    })
})
app.get('/mylife',myLife.list)

app.get('/mylife/diarylist',Diary.list)


app.get('/mylife/diary/:id',Diary.detail)

app.get('/mylife/mood',Mood.list)

app.get('/mylife/pic',function(req,res){
    res.render('mylifePic',{
        title:'我的'
    })
})
app.get('/note',Note.list)
app.get('/note/detail/:id',Note.detail)
app.get('/work',function(req,res){
    res.render('work',{
        title:'上线作品'
    })
})

app.post('/user/signin',User.signin)


//admin
app.get('/mylife/mood/new',User.signinRequired,function(req,res){
    res.render('mylifeMoodnew',{
        title:'我的'
    })
})
app.post('/mylife/mood/save',Mood.save)

app.get('/mylife/diary/diary/new',User.signinRequired,function(req,res){
    res.render('mylifeDiarynew',{
        title:'我的'
    })
})
app.post('/mylife/diary/save',Diary.save)


app.get('/note/new',User.signinRequired,function(req,res){
    res.render('notenew',{
        title:'前端笔记'
    })
})
app.post('/note/save',Note.save)