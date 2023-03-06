const express=require("express");

const mongoose=require("mongoose");

require("dotenv").config();

const cors=require("cors");

const port=process.env.PORT || 8080;

const app=express();

app.use(cors() , express.json());

const connect=require("./db.connector/db.connector");

mongoose.set("strictQuery",false);

connect();

//routers

const authRouter =require("./routers/auth.router");

app.use("/",authRouter);

app.listen(port,()=>{
    console.log("Server listening at:",port);
})