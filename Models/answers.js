import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema

const answerSchema = new mongoose.Schema({
   topic:{
    type: String,
    required: true,
   }, 
   user:{
    type: ObjectId,
    ref: 'user',
   },
   
   answers:{
    type: String,
    required: true,
   }  
})

const Answer = mongoose.model("answer",answerSchema )

export {Answer};


