import config from "../../config";
import { pool } from "../../db";
import type { IUser } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const createUserIntoDB = async(payload:IUser)=>{

    const {name,email,password,role} = payload;
    const hasPassword = await bcrypt.hash(password,10);
    const result = await pool.query(`
        INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
        `,[name,email,hasPassword,role])

    delete result.rows[0].password;
    return result;
}
const loginInUserIntoDB=async(payload:{email:string,password:string})=>{

    const {email,password}=payload;
    const userData =await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email])

    if(userData.rows.length===0){
        throw new Error("Invalid Credential");
    }
    const user = userData.rows[0];
    const matchedPassword = await bcrypt.compare(password,user.password);
    if(!matchedPassword){
        throw new Error("Invalid Credential")
    }
    const jwtPayload ={
        id: user.id,
        name:user.name,
        role: user.role
    }
    const token = jwt.sign(jwtPayload,config.jwt_access_token_secret as string,{expiresIn: '1d'})
    delete user.password;
    return {token,user}

}
export const authService ={
    createUserIntoDB,
    loginInUserIntoDB
}