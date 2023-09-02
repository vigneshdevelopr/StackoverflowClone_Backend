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

const PORT = process.env.port;

app.use(express.json());
app.use(cors());
app.use("/user", signupRouter);
app.use("/user", loginRouter);
app.use("/",isSignedIn, doubtscontent);
createConnection();
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
//================================================================

app.get("/", (req, res) => {
  res.status(200).send("working");
  console.log("working");
});
