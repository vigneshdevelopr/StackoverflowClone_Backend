import mongoose from "mongoose";

const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    content: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Doubt",
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
