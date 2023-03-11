const express=require("express");

const { body, validationResult } = require('express-validator');

const {Signup}=require("../controllers/auth.controller");

const {Login}=require("../controllers/auth.controller");

const {verifyToken}=require("../controllers/auth.controller");


const authRouter=express.Router();

authRouter
    .post("/signup", body("email").isEmail() , body("username").isLength({min:2}) , body("password").isLength({min:6}) , Signup)
    .post("/login",Login)
    .get("/verifyToken",verifyToken)
module.exports=authRouter;