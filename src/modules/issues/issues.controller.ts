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
        const result = await issuesService.getAllIssuesFromDB(req.query as any);
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
const getSingleUser =async(req:Request,res:Response)=>{
    const {id}= req.params;
    try{
        const result = await issuesService.getSingleUserFromDB(id as string)
        sendResponse(res,{
            statusCode: 200,
            success: true,
            data: result
        })
    }catch(error:any){
        sendResponse(res,{
            statusCode:404,
            success: false,
            message: "User not found",
            error: error.error
        })
    }
}
const updateIssue = async(req:Request,res:Response)=>{
    const {id} =req.params;
     try{
        const result = await issuesService.updateIssueIntoDB(id as string,req.body)
        sendResponse(res,{
            statusCode: 200,
            success:true,
            message: "Issue updated successfully",
            data:result.rows[0]
        })
     }catch(error:any){
        sendResponse(res,{
            statusCode:500,
            success: false,
            message: "Update unsuccessful",
            error: error.error
        })
    }
}
const deleteIssue =async(req:Request,res:Response)=>{
    const {id} =req.params;
    try{
        const result = await issuesService.deleteIssueFromDB(id as string);
        if(result.rowCount !==0){
            sendResponse(res,{
            statusCode: 200,
            success:true,
            message: "Issue deleted successfully",
        })
        }else{
            sendResponse(res,{
                statusCode: 404,
                success: false,
                message: "User not found"
            })
        }
    }catch(error:any){
        sendResponse(res,{
            statusCode:500,
            success: false,
            message: "Delete unsuccessful",
            error: error.error
        })
    }
}
export const issuesController ={
    createIssue,
    getAllUser,
    getSingleUser,
    updateIssue,
    deleteIssue
}