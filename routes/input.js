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
    User.findById(req.params.userid,(err,findUser)=>{//req.params gets the value from the url
        res.render("./edit.ejs",{findUser:user})
    })
})

app.put("/edit/:id",(req,res)=>{
    var NewUser={
        username:req.body.username,
        email:req.body.email
    }
     User.findByIdAndUpdate(req.params.id,NewUser,(err,updatedUser)=>{
        if(err){
            throw err;
        }
              console.log(updatedUser);
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


