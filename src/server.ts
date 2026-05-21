import app from "./app";
import config from "./config";


const port = config.port;
app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});