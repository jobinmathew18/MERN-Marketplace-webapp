const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
            console.log(user)
            if(err) res.status(403).json("Token is not valid.")
            req.user = user                 //adding user in req.user
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated")   
    } 
}

const verifyTokenAndAuthorization = (req,res,next)=>{                   //for both user and admin
    verifyToken(req,res, ()=>{                                              //this call back function is been passed inside "next" of verifyToken function.
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("Not allowed.") 
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{                       //for admin only 
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("Not allowed.") 
        }
    })
}


module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}     