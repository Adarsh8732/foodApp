
const express = require("express");
const app = express();
const path = require('path');
app.listen('5000',function(){
    console.log("server listening at 5000");
})
app.use(express.static('public'));
app.use(express.json());

let user=[]

const userRouter = express.Router();
const authRouter = express.Router();
// app.use((res,req,next)=>{
//     console.log("i am first middleware");
//     next();
// })
app.use("/user",userRouter);
app.use("/auth",authRouter);

userRouter
.route('/')
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser)

// user 

// app.use((res,req,next)=>{
//     console.log(" i am second middleware");
//     next();
// })
authRouter
.route('/signup')
.post(singupUser)

authRouter
.route('/forgetpassword')
.get(getPasswoed)
.post(postPassword,validateEmail)

app.use('/user-all',(req,res)=>{
    res.redirect("/user");
})

function getPasswoed(req,res){
    res.sendFile(path.join(__dirname,"./public/forgetpassword.html"));
}

function postPassword(req,res,next){
    let {email}=req.body;
    // user.push({email});
    console.log("user backend",req.body);
    next();

   
}
function validateEmail(req,res){
    console.log('from validate function');
    console.log(req.body);
    res.json({
        message: 'user singedup',
        user:req.body
        // user:user
    })
}
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"./public/404.html"));
})



function singupUser(req,res){
    let {email,password,name}=req.body;
    user.push({email,name,password});
    console.log("user backend",req.body);
    res.json({
        message: 'user singedup',
        user:req.body
        // user:user
    })
}
// app.get("/user",getUser);
function getUser (req,res){
    res.json(user);
}

// app.post("/user",createUser)

function createUser(req,res){
    user = req.body;
    res.send("data had been added successfully");
}
// app.patch("/user",updateUser)
function updateUser (req,res){
    let obj = req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    // res.send("data updated sucessfullluy");
    res.send(user);
}
// app.delete("/user",deleteUser)
function deleteUser (req,res){
    user = {};
    res.json(user);
}
// app.get("/user/:id",getUserById)
function getUserById (req,res){
    let id = req.params.id;
    res.json(id);
}