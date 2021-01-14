// ESSENTIAL IMPORTS:
const Express = require('express');
const app = Express(); 
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const User=require("./models/user")
const postRoute = require('./routes/input');


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


// FOUR MAIN REST METHODS:
// POST(create),GET(read),PUT(update),DELETE(delete)

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.get('/display',(req,res)=>{
    User.find({},(err,User)=>{
        res.render("display.ejs",{User})
    })
})

app.use('/post',postRoute);

app.listen(4500,(err)=>{
    if(err){
        console.log('why?'+err);
    }
    else{
        console.log("server running on port 4500");
    }
})



//connecting to the database:
mongoose.connect('mongodb://localhost/example',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},function(err){
    if(err)
        throw err;
    else
        console.log("connnected to the DB")});

// app.locals.moment = require('moment');
