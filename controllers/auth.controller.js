const User=require("../models/user.model");


const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");

exports.Signup=async(req,res)=>{
    const {username,password,email}=req.body;

    try{
        const hashPassword=await bcrypt.hash(password , 10);

        const newUser=await User.create({username, email , password:hashPassword})

        newUser.save();

        res.send("created");
    }catch{
        res.status(400);
    }
}


exports.Login=async(req,res,next)=>{
    const {username,password,email}=req.body;

    try{

        const existingUser=await User.find({email:email});

        if(existingUser==""){
            return res.status(404).send("couldnt find user");
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

        req.headers.token=token;

        next();

    }catch(err){
        res.send(err);
    }
}