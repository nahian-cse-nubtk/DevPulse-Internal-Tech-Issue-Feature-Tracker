import type { Request,Response } from "express"
import sendResponse from "../../utility/sendResponse"
import { issuesService } from "./issues.service"

const createIssue = async(req:Request,res:Response)=>{
    try{
        const result = await issuesService.createIssue(req.user.id,req.body);
        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "Issue create successfully",
            data: result.rows[0]
        })

    }catch(error:any){
        sendResponse(res,{
            statusCode:500,
            success: false,
            message: "Login Failed",
            error: error.error
        })
    }
}
const getAllUser = async(req:Request,res:Response)=>{

    try{
        const result = await issuesService.getAllUserFromDB(req.query as any);
        sendResponse(res,{
            statusCode: 200,
            success: true,
            data: result
        })

    }catch(error:any){
        sendResponse(res,{
            statusCode:500,
            success: false,
            message: "Unable to retrieve data",
            error: error.error
        })
    }
}
export const issuesController ={
    createIssue,
    getAllUser
}