// ESSENTIAL IMPORTS:
const Express = require('express');
const app = Express(); 
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const User=require("./models/user")
const postRoute = require('./routes/input');

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

//MIDDLEWEARS
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use('/post',postRoute);

// FOUR MAIN REST METHODS:
// POST(create),GET(read),PUT(update),DELETE(delete)


//=========================================================================
app.get('/',(req,res)=>{ //root route
    res.send("hello world");
})

//==============================================================================


//display route which displays all the user
app.get('/display',(req,res)=>{
    User.find({},(err,allUser)=>{//User.find({}) gets all the user and stores in allUser
        res.render("display.ejs",{allUser})//allUser is sent to display.ejs 
    })
})

//==============================================================================================

app.listen(4500,(err)=>{
    if(err){
        console.log('why?'+err);
    }
    else{
        console.log("server running on port 4500");
    }
})






