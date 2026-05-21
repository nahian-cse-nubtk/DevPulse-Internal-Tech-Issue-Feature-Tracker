import dotenv from "dotenv"

import path from "path"

dotenv.config({path: path.join(process.cwd(),'.env')})

const config ={
    port: process.env.PORT,
    ConnectionString: process.env.DB_CONNECTION,
    jwt_access_token_secret:process.env.JWT_ACCESS_TOKEN_SECRET
}
export default config;