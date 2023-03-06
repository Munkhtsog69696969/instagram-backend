const jwt=require("jsonwebtoken")

exports.authMiddleware=async(req,res)=>{
    if(!req.headers.token){
        return res.status(401).send("Token required");
    }

    const token=req.headers.token;

    if(!token){
        return res.status(401).send("token required");
    }

    try{
        const decoded=jwt.verify(token , process.env.SECRET_KEY);

        res.send(decoded)
    }catch(err){
        res.status(401).send("invalid token");
    }
}