import { pool } from "../../db";
import type { IIssue, ISSUESTYPE } from "./issues.interface";


const createIssue = async(id:number,payload:IIssue)=>{

    const {title,description,type,status}=payload;

    const result = await pool.query(`
         INSERT INTO issues(title,description,type,reporter_id,status) VALUES($1,$2,$3,$4,COALESCE($5,'open')) RETURNING *
        `,[title,description,type,id,status])
    return result;
}
const getAllUserFromDB =async(payload:ISSUESTYPE)=>{
  const { sort = "newest", type, status } = payload;

  const result = await pool.query(`
    SELECT * FROM issues
    WHERE ($1::text IS NULL or type=$1) AND ($2::text IS NULL or status=$2)
    ORDERED BY created_at ${sort==="oldest"?"ASC":"DESC"}
    `,[type || null,status || null])
    return result;


}
export const issuesService ={
    createIssue,
    getAllUserFromDB
}