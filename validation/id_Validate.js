import {body,param} from "express-validator";


const idParam_UUID_Validate = [
    param("id")
    .isUUID().withMessage("id isn't valid,uuid required")
    
]


export default {
    idParam_UUID_Validate
};
