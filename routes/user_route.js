import express from "express";
const user_Route = express.Router();

import user_Controller from "../controller/user_Controller.js";

import { validate } from "../middleware/response_handler.js";
import validation from "../validation/user_Validate.js";
import idValidation from "../validation/id_Validate.js";
import { ExpressValidator } from "express-validator";

//user
user_Route.post("/register",validate(validation.userRegister_Validate),user_Controller.user_Register);
user_Route.post("/login",validate(validation.userLogin_Validate),user_Controller.user_Login);
user_Route.get("/totalUsers",user_Controller.user_Count);
user_Route.patch("/:id/editProfile",validate(validation.userEditInfo_Validate),user_Controller.user_editProfile);

//admin
user_Route.get("/",user_Controller.getAllUser);
user_Route.get("/:id",validate(idValidation.idParam_UUID_Validate),user_Controller.getUserById);
user_Route.delete("/:id",validate(idValidation.idParam_UUID_Validate),user_Controller.user_delete);

export {user_Route};