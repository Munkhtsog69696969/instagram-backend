const express=require("express");

const {Signup}=require("../controllers/auth.controller");

const {Login}=require("../controllers/auth.controller");

const {authMiddleware}=require("../middleware/auth.middleware");

const authRouter=express.Router();

authRouter
    .post("/signup",Signup)
    .post("/login",Login,authMiddleware)
module.exports=authRouter;