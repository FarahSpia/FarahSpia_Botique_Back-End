import express from "express";
import "dotenv/config.js";
const app = express();

const PORT = process.env.PORT;

app.get("/",(req,res)=>res.send("welcome to server"));

app.listen(PORT,()=>console.log(`server is running on PORT:${PORT}`));