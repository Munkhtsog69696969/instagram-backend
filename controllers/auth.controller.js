const User=require("../models/user.model");

const { body, validationResult } = require('express-validator');

const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");

exports.Signup=async(req,res)=>{
    const {username,password,confirmPassword,email}=req.body;

    const existingEmail=await User.findOne({email:email});

    console.log(existingEmail)

    if(existingEmail!==null){
        return res.status(400).send("Email in use")
    }

    if(confirmPassword!==password){
        return res.status(400).send("Passwords do not match")
    }

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        if(errors.errors[0].param=="email"){
            return res.status(400).send("Invalid email");
        }

        if(errors.errors[0].param=="username"){
            return res.status(400).send("Username must be longer than 2 characters");
        }
        
        if(errors.errors[0].param=="password"){
            return res.status(400).send("Password must be longer than 6 characters");
        }
    }   

    try{
        const hashPassword=await bcrypt.hash(password , 10);

        const newUser=await User.create({username, email , password:hashPassword})

        newUser.save();

        res.status(200).send("created")
    }catch{ 
        res.status(400);
    }
}


exports.Login=async(req,res)=>{
    const {password,email}=req.body;

    try{

        const existingUser=await User.find({email:email});

        if(existingUser==""){
            return res.status(404).send("Couldnt find user");
        }

        const isValidPassword=await bcrypt.compare(password , existingUser[0].password);

        if(!isValidPassword){
            return res.status(400).send("username or email wrong");
        }

        const token=jwt.sign(
            {token:existingUser},
            process.env.SECRET_KEY,
            {expiresIn:"3h"},
        );

        res.status(200).send(token)

    }catch(err){
        res.send(err);
    }
}

exports.verifyToken=async(req,res)=>{
    if(req.headers.token==""){
        return res.status(400).send("Token required");
    }

    const token=req.headers.token;

    try{
        jwt.verify(
            token,
            process.env.SECRET_KEY,
            (error , item)=>{
                if(!error){
                    res.send(item);
                }
            }
        )
    }catch(error){
        res.status(401);
    }
}