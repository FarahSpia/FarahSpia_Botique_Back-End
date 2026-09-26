import express from "express";
import "dotenv/config.js";
const app = express();

const PORT = process.env.PORT;

import { globalError_Middleware } from "./middleware/response_handler.js";

//user
import {user_Route} from "./routes/user_route.js";

app.use(express.json());

app.use("/user",user_Route);


app.get("/",(req,res)=>res.send("welcome to server"));

app.use(globalError_Middleware);

app.listen(PORT,()=>console.log(`server is running on PORT:${PORT}`));