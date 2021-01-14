const Express = require('express');
const app = Express.Router(); 
const User=require("../models/user")


app.get('/',(req,res)=>{

    try{
        res.render('./index.ejs');
    } catch(err){
        console.log('why: '+err);
    }

})

app.post("/",(req,res)=>{
    var NewUser={
        username:req.body.username,
        email:req.body.Email
    }
    User.create(NewUser,(err,user)=>{
        if(err){
            throw err
        }
        else{
            
            console.log(user)
            
            res.redirect("/")
        }
    })
})


app.get("/edit/:userid",(req,res)=>{
    User.findById(req.params.userid,(err,user)=>{
        res.render("./edit.ejs",{user})
    })
  
})

app.put("/edit/:id",async(req,res)=>{
    var NewUser={
        username:req.body.username,
        email:req.body.email
    }
    await User.findByIdAndUpdate(req.params.id,NewUser,(err,user)=>{
        if(err){
            throw err;
        }
              console.log(user);
 
    })
    res.redirect("/")
})

app.delete("/delete/:id",(req,res)=>{
    User.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            throw err
        }
    })
    res.redirect("/")
})

module.exports = app;


