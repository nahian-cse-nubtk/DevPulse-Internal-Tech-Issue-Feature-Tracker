import app from "./app";
import config from "./config";
import { initDB } from "./db";


const port = config.port;
initDB()
app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});