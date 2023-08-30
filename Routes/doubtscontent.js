import express from "express";
import { Doubt } from "../Models/doubtsontent.js";
import Answer from "./answers.js";

const router = express.Router();

router.post("/questions", async (req, res) => {
  try {
    let date = new Date();

    let doubt = await new Doubt({ ...req.body, date: date, user: req.user._id }).save();
    console.log(doubt)
    return res
      .status(200)
      .json({ message: "Your Question is Added Successfully✅" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/questions/:id", async (req, res) => {
  try {
    const deleteQuestion = await Doubt.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deleteQuestion)
      return res
        .status(400)
        .json({ message: "Error occured in Delete the Question" });
    return res
      .status(200)
      .json({ message: "Your Selected Question is Successfully Deleted✅" });
  } catch (error) {}
});

//get the all the questions: 

router.get("/questions", async(req, res)=>{
    try {
        const getQuestions = await Doubt.find().populate("user","name email")
        if(!getQuestions)
        return res.status(400).json({message: "Error occured during the get the questions"})
        return res.status(200).json(getQuestions)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }

})

//================================Answer==============================================================

router.post("/answers/:questionId", async (req, res) => {
    try {
      const { content } = req.body;
      const { questionId } = req.params;
      const date = new Date();
  
      const answer = await new Answer({
        content,
        date,
        question: questionId,
      }).save();
  
      const updatedQuestion = await Doubt.findByIdAndUpdate(
        questionId,
        {
          $push: { answers: answer },
        },
        { new: true }
      );
  
      return res.status(200).json({
        message: "Your answer has been added successfully.",
        answer,
        updatedQuestion,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  });



  // Get all answers for a question
router.get("/answers/:questionId", async (req, res) => {
    try {
      const { questionId } = req.params;
  
      const question = await Doubt.findById(questionId).populate({
        path: "answers",
        populate: {
          path: "user",
          select: "name email",
        },
      });
  
      if (!question)
        return res.status(400).json({ message: "Question not found." });
  
      return res.status(200).json(question.answers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  });

// Update an answer by ID
router.put("/answers/:id", async (req, res) => {
    try {
      const updatedAnswer = await Answer.findByIdAndUpdate(
        req.params.id,
        {
          content: req.body.content,
        },
        { new: true }
      );
      if (!updatedAnswer)
        return res
          .status(400)
          .json({ message: "Error occurred in updating the answer" });
      return res
        .status(200)
        .json({ message: "Your selected answer is successfully updated✅", updatedAnswer });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });



//Delete the answers
router.delete("/answers/:id", async (req, res) => {
  try {
    const deleteAnswer = await Answer.findByIdAndDelete(req.params.id);
    if (!deleteAnswer)
      return res
        .status(400)
        .json({ message: "Error occurred in deleting the answer" });
    return res
      .status(200)
      .json({ message: "Your selected answer is successfully deleted✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});



// Get a single question by ID and populate its answers
router.get("/questions/:id", async (req, res) => {
    try {
      const question = await Doubt.findById(req.params.id)
        .populate("user", "name email")
        .populate("answers", "content user date");
      if (!question) {
        return res
          .status(404)
          .json({ message: "Question not found" });
      }
      return res.status(200).json(question);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

export default router;








export const doubtscontent = router;
