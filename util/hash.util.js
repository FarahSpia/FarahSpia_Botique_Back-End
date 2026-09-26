import bcrypt from "bcrypt"
import "dotenv/config.js";

const hash_Password =async (password)=>{
   
    const hashed = await bcrypt.hashSync(password,10); 
    return hashed
}

const compare_Password = async(password,hashedPassword)=>{

    const CheckPassISCorrect = await bcrypt.compareSync(password,hashedPassword);
    return CheckPassISCorrect;
} 

export default {
    compare_Password,
    hash_Password
}

