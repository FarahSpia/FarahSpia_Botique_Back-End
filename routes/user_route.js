import express from "express";
const user_Route = express.Router();

import user_Controller from "../controller/user_Controller.js";

import { validate } from "../middleware/response_handler.js";
import validation from "../validation/user_Validate.js";

//user
user_Route.post("/register",validate(validation.userRegister_Validate),user_Controller.user_Register);
user_Route.post("/login",validate(validation.userLogin_Validate),user_Controller.user_Login);


//admin
user_Route.get("/",user_Controller.getAllUser);
user_Route.get("/:id",user_Controller.getUserById);
user_Route.delete("/:id",user_Controller.user_delete);
export {user_Route};