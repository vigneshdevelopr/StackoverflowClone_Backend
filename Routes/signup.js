import express from "express";
import { generateAuthToken, User } from "../Models/users.js";
import bcrypt from "bcrypt";


const router = express.Router();

router.post('/signup', async(req, res)=>{
    try {
        
    
    let user = await User.findOne({email: req.body.email}) 
    if(user) 
    return res.status(409).json({message: "This Email Address already exists"})

//generate password for new user

const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(req.body.password, salt);

//new password creating 

user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
}).save();
const token =  generateAuthToken(user._id);

res.status(201).json({message: `welcome ${req.body.name} to our new family`,token })
} catch (error) {
     console.log(error)
     res.status(500).json({message: error.message})

}
})

export const signupRouter = router;