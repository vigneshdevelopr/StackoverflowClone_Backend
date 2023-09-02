import express from "express";
import dotenv from "dotenv";
import { createConnection } from "./dbconnection.js";
dotenv.config();
import cors from "cors";
import { loginRouter } from "./Routes/login.js";
import { signupRouter } from "./Routes/signup.js";
import { doubtscontent } from "./Routes/doubtscontent.js";
import { isSignedIn } from "./Auth/auth.js";
import cron from 'node-cron'
const app = express();

const PORT = process.env.port;

app.use(express.json());
app.use(cors());
app.use("/user", signupRouter);
app.use("/user", loginRouter);
app.get('/',(req,res)=>{
  return res.status(200).json({message: 'Stackoverflow server working'})
})
app.use("/",isSignedIn, doubtscontent);
createConnection();

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
//================================================================

app.get("/home", (req, res) => {
 return res.status(200).send("working");
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});