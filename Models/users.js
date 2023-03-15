import  mongoose  from "mongoose";
import  jwt  from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 35,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 35,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
   
})

const generateAuthToken = (id)=>{
    return jwt.sign({id}, process.env.SecretKey)
}


const User = mongoose.model("user",userSchema)
export{User, generateAuthToken}