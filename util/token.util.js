import jwt from "jsonwebtoken";
import "dotenv/config.js";

const create_Token = (data)=>{
 const  JWTsecret = process.env.JWT_SECRET;
 const token = jwt.sign(data,JWTsecret,{expiresIn : 60 * 60});
  
 return token;
}

const verify_Token = (token)=>{
   const  JWTsecret = process.env.JWT_SECRET;
   try{
   const verifyedToken = jwt.verify(token,JWTsecret);
   return verifyedToken
   }catch(err){
      return undefined;
   }
 
}


export default {
    create_Token,
    verify_Token
}

