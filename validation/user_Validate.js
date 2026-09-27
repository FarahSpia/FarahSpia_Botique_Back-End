import {body,param} from "express-validator";


const userRegister_Validate = [  
    body("userName")
    .isString()
    .isLength({min:5}).withMessage("userName must be at least 5 characters")
    ,
    body("email")
    .isString()
    .isEmail().withMessage("the email isn't valid")
    ,
    body("password")
    .isString()
    .isLength({min:8}).withMessage("password must be at least 8 characters")

]

const userLogin_Validate = [  
     body("email")
    .isString()
    .isEmail().withMessage("the email isn't valid")
    ,
    body("password")
    .isString()
    .isLength({min:8}).withMessage("password must be at least 8 characters")
    
]

const userEditInfo_Validate = [
    body("userName")
    .isString().withMessage("must be string")
    .isLength({min:5}).withMessage("userName must be at least 5 characters")
    ,
    param("id")
    .isUUID().withMessage("id isn't valid,uuid required")
    
]

const forgetPassword_Validate = [
     body("email")
    .isString()
    .isEmail().withMessage("the email isn't valid")
]

const resetPassword_Validate = [
    body("email")
    .isString()
    .isEmail().withMessage("the email isn't valid")
    ,body("newPassword")
    .isString()
    .isLength({min:8}).withMessage("password must be at least 8 characters"),
    body("code")
    .isString()
    .isLength({min:6}).withMessage("code must be 6 digit")
]




export default {
    userLogin_Validate,
    userRegister_Validate,
    userEditInfo_Validate,
    forgetPassword_Validate,
    resetPassword_Validate
};
