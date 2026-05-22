import express, { type Request, type Response } from "express"
import { UserRouter } from "./modules/auth/auth.route";
import {  issuesRouter } from "./modules/issues/issues.route";
import cors from "cors"
import { corsOptions } from "./middleware/corsOptions";
import globalErrorHandler from "./middleware/globalErrorHandle";
const app = express();

//middleware
app.use(express.json())
app.use(cors(corsOptions))


//router
app.use('/api/auth',UserRouter);
app.use('/api/issues',issuesRouter)

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message:"The server is running properly",
    Author: "Dev pulse"
  })
});
app.use(globalErrorHandler)
export default app;