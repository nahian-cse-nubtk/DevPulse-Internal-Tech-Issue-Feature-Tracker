import express, { type Request, type Response } from "express"
import { UserRouter } from "./modules/auth/auth.route";
const app = express();

//middleware
app.use(express.json())

//router
app.use('/api/auth',UserRouter);

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message:"The server is running properly",
    Author: "Dev pulse"
  })
});
export default app;