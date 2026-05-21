import express, { type Request, type Response } from "express"
const app = express();

//middleware
app.use(express.json())


app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message:"The server is running properly",
    Author: "Dev pulse"
  })
});
export default app;