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

  const issuesResult = await pool.query(`
    SELECT * FROM issues
    WHERE ($1::text IS NULL or type=$1) AND ($2::text IS NULL or status=$2)
    ORDER BY created_at ${sort==="oldest"?"ASC":"DESC"}
    `,[type || null,status || null])
   const issues = issuesResult.rows
    const reporterIds = [...new Set(issues.map(issue=>issue.reporter_id))]


    const reportersResult = await pool.query(`
        SELECT id,name,role FROM users WHERE id=ANY($1)`,[reporterIds])

        const reporters = reportersResult.rows;

        const formatedIssues = issues.map(issue=>{
            const reporter = reporters.find(user=>user.id===issue.reporter_id);
            return {
                id: issue.id,
                title: issue.title,
                description: issue.description,
                type: issue.type,
                status: issue.status,
                reporter,
                created_at: issue.created_at,
                updated_at: issue.updated_at
            }
        })
    return formatedIssues;


}
export const issuesService ={
    createIssue,
    getAllUserFromDB
}