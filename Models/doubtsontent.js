import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema

const doubtSchema = new mongoose.Schema({
   topic:{
    type: String,
    required: true,
   }, 
   user:{
    type: ObjectId,
    ref: 'user',
   },
   date:{
    type: String,
    required: true,
   }, 
   questions:{
    type: String,
    required: true,
   },
   answers: {
      type: Array,
      required: false
  }
}, {
  timestamps: true

})

const Doubt = mongoose.model("doubt",doubtSchema )

export {Doubt};


