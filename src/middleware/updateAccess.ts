import type { NextFunction, Request, Response } from "express"
import { pool } from "../db";
import sendResponse from "../utility/sendResponse";

const updateAccess =()=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const {id,role}=req.user;

        try{
            const issueResult = await pool.query(`
        SELECT * FROM issues WHERE reporter_id=$1 AND status =$2
            `,[id,"open"])
        const issue = issueResult.rows
        if(role==="contributor" && issue.length !==0){

            next()
        }
        else if(role==="maintainer"){
            next()
        }
        else {
            sendResponse(res,{
                statusCode: 403,
                success: false,
                message: "Access Forbidden"
            })
        }
        }catch(error:any){
        next(error);
        }

    }
}


export default updateAccess;