import { prisma} from "../util/prisma.util.js";
import { custom_Error,response_Handler} from "../middleware/response_handler.js";
import Hash from "../util/hash.util.js";
import JWT from "../util/token.util.js";
import crypto from "crypto"

//user

const user_Register = async(req,res,next)=>{
   
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
      
}

const user_Login = async(req,res,next)=>{
  
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

}


const forgotPassword = async (req, res, next) => {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            custom_Error("user not found with this email",404);
        }

        const code = crypto
            .randomInt(100000, 1000000)
            .toString();

        const codeHash = crypto
            .createHash("sha256")
            .update(code)
            .digest("hex");

        const expiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await prisma.passwordResetCode.create({
            data: {
                userId: user.id,
                codeHash,
                expiresAt
            }
        });

        // فعلاً به جای Email
        console.log("RESET CODE:", code);

       response_Handler(200,"code sent to your email",{code:code},res);

};

const resetPassword = async (req, res, next) => {

        const {
            email,
            code,
            newPassword
        } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            custom_Error("user not found with this email",404);
        }

        const codeHash = crypto
            .createHash("sha256")
            .update(code)
            .digest("hex");

        const resetCode =
            await prisma.passwordResetCode.findFirst({
                where: {
                    userId: user.id,
                    codeHash
                }
            });

        if (!resetCode) {
           custom_Error("Invalid or expired code",400);
        }

        if (resetCode.expiresAt < new Date()) {
           custom_Error("Code has expired",400);
        }

        const hashedPassword = await Hash.hash_Password(newPassword);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashedPassword
            }
        });

        await prisma.passwordResetCode.delete({
            where: {
                id: resetCode.id
            }
        });

      response_Handler(200, "Password reset successfully",res);

};



const user_editProfile = async(req,res,next)=>{
    
    const {id} = req.params;
    const {userName} = req.body;
    
    const user = await prisma.user.findFirst({
        where:{
            id
        }
    })
    

    if(!user) custom_Error("user with this id isn't found",404);

    const theUser = await prisma.user.update({
        where:{
            id
        },
        data:{
            userName:userName
        },omit:{
            password:true
        }
    })

    response_Handler(200,"userName is changed successfully",{user:theUser},res);

    
    

}

const user_Count = async(req,res,next)=>{
   
  const users = await prisma.user.count({});
        
  response_Handler(200,"total users result",{total:users},res);

}





//admin

const getAllUser = async(req,res,next)=>{
 
    const users = await prisma.user.findMany({
        omit:{
            password:true
        }
    });

    if(users.length == 0) return response_Handler(200,"no user exist in database",{user:users},res);

   response_Handler(200,"all user found",users,res);
  
}

const getUserById = async(req,res,next)=>{
   
      const {id} = req.params;

    // if(!id) custom_Error("bad request,id isn't valid",400);

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

}

const user_delete = async(req,res,next)=>{
   
         const {id} = req.params;
    // if(!id) custom_Error("bad request,id isn't valid",400);

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

}


export default {
    getAllUser,
    getUserById,
    user_Count,
    user_delete,
    user_Register,
    user_Login,
    user_editProfile
    
};