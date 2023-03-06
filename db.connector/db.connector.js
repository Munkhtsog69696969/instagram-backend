const mongoose=require("mongoose");

require("dotenv").config();

const uri=process.env.URI;

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("connected to DB");
    }catch(error){
        console.log(error);
    }
}

module.exports=connect;