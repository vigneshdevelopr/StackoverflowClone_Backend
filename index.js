import express from "express";
import dotenv from "dotenv";
import { createConnection } from "./dbconnection.js";
dotenv.config();
import cors from "cors";
import { loginRouter } from "./Routes/login.js";
import { signupRouter } from "./Routes/signup.js";
import { doubtscontent } from "./Routes/doubtscontent.js";
import { isSignedIn } from "./Auth/auth.js";
const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use("/user", signupRouter);
app.use("/user", loginRouter);
app.get('/',(req,res)=>{
  return res.status(200).json({message: 'Stackoverflow server working'})
})
app.use("/",isSignedIn, doubtscontent);
createConnection();


//================================================================

app.get("/home", (req, res) => {
 return res.status(200).send("working");
});


app.listen(PORT,'0.0.0.0', () => {
  console.log(`listening on port ${PORT}`);
});