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
    
]




export default {
    userLogin_Validate,
    userRegister_Validate,
    userEditInfo_Validate
};
