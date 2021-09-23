const mongoose = require("mongoose");
const {db_link} = require("../secret");
let validator = require("email-validator");
 
// validator.validate("test@email.com");
mongoose.connect(db_link).then(function(db){
    // console.log(db);
    console.log("db connected")
})
.catch(function(err){
    console.log(err);
})
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return validator.validate(this.email);
        }
    },
    // createdAt:Date,
    createdAt:{
        type:Date
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    confirmPassword:{
        type:String,
        required:true,
        min:8,
        validate:function(){
            return this.password==this.confirmPassword
        }
    }
})
const userModel = mongoose.model('userModel',userSchema);
(async function createUser(){
    let user={
        name:'Abhi',
        age:20,
        email:'abd@gmail.com',
        password:'12345678',
        confirmPassword:'12345678'
    };
    let userObj = await userModel.create(user);
    console.log(userObj);
})();