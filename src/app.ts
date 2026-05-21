import express, { type Request, type Response } from "express"
import { UserRouter } from "./modules/auth/auth.route";
import {  issuesRouter } from "./modules/issues/issues.route";
const app = express();

//middleware
app.use(express.json())

//router
app.use('/api/auth',UserRouter);
app.use('/api/issues',issuesRouter)

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message:"The server is running properly",
    Author: "Dev pulse"
  })
});
export default app;