import { prisma} from "../util/prisma.util.js";
import { custom_Error,response_Handler} from "../middleware/response_handler.js";
import Hash from "../util/hash.util.js";
import JWT from "../util/token.util.js";

//user

const user_Register = async(req,res,next)=>{
   try{
    const {userName,email,password} = req.body;

    const user = await prisma.user.findFirst({
        where:{
           email,
        }
    })

    if(user)  custom_Error("conflict,user exist",409);

    const hashPass = await Hash.hash_Password(password);

    const data = await prisma.user.create({
        data:{
            userName,
            email,
            password : hashPass,
        }
    })
    
    const newRecord = {
        id:data.id,
        userName:data.userName,
        email:data.email,
        role:data.role,
    }
  
    const token = JWT.create_Token(newRecord);

    response_Handler(201,"user register successfully",{user:newRecord,token:token},res);
      
   }catch(error){
      next(error)
   }
}

const user_Login = async(req,res,next)=>{
  try{
    const {email,password} = req.body;

    const user = await prisma.user.findFirst({
        where:{
           email,
        }
    })
    // console.log("user:",user);
    if(!user)  custom_Error("user not found", 404);

    const compare_pass = await Hash.compare_Password(password,user.password);

    // console.log("compare:",compare_pass);

    if(!compare_pass)  custom_Error("email or password isn't Valid", 401);

    const theRecord = {
        id:user.id,
        userName:user.userName,
        email:user.email,
        role:user.role,
    }

    // console.log("record:",theRecord);
   
    const token = JWT.create_Token(theRecord);

    // console.log("token:",token);

   response_Handler(200,"user Login Successfully",{user:theRecord,token:token},res);

  }catch(error){
    next(error)
  }
}

const user_forgetPassword = async(req,res,next)=>{
    try{

    }catch(error){
       next(error)
    }
}

const user_editProfile = async(req,res,next)=>{
    try{

    }catch(error){
        next(error)
    }
}

const user_Count = async(req,res,next)=>{
    try{
        
    }catch(error){
        next(error)
    }
}



//admin

const getAllUser = async(req,res,next)=>{
  try{
    const users = await prisma.user.findMany({
        omit:{
            password:true
        }
    });

    if(users.length == 0) return response_Handler(200,"no user exist in database",{user:users},res);

   response_Handler(200,"all user found",users,res);
  }catch(error){
    next(error)
  }
}

const getUserById = async(req,res,next)=>{
    try{
      const {id} = req.params;

    if(!id) custom_Error("bad request,id isn't valid",400);

     const user = await prisma.user.findFirst({
        where:{
            id
        },include:{
            images:true,favorites:true
        }, omit:{
          password:true
        }
     })

    if(!user) custom_Error("user not found",404);

    response_Handler(200,"the user found",{user:user},res);

    }catch(error){
       next(error)
    }
}

const user_delete = async(req,res,next)=>{
    try{
         const {id} = req.params;
    if(!id) custom_Error("bad request,id isn't valid",400);

     const user = await prisma.user.findFirst({
        where:{
            id
        }
     })

     if(!user) custom_Error("user not found",404);

     const userImage = await prisma.userImage.deleteMany({
        where:{
            user_id:id
        }
     })

     const favorite = await prisma.favorite.deleteMany({
        where:{
            user_id:id
        }
     })

     const theUser = await prisma.user.delete({
        where:{
            id
        },include:{
            images:true,favorites:true
        }, omit:{
          password:true
         }
     })


     response_Handler(200,"user remove successfully",{user:theUser},res);

    }catch(error){
      next(error)
    }
}


export default {
    getAllUser,
    getUserById,
    user_delete,
    user_Register,
    user_Login,
    
};