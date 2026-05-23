import type { JwtPayload } from "jsonwebtoken";
import { pool } from "../../db";
import type { IIssue, ISSUESTYPE } from "./issues.interface";



const createIssue = async(user:JwtPayload,payload:IIssue)=>{

    const {title,description,type,status}=payload;

        const result = await pool.query(`
         INSERT INTO issues(title,description,type,reporter_id) VALUES($1,$2,$3,$4) RETURNING *
        `,[title,description,type,user.id])

    return result;


}
const getAllIssuesFromDB =async(payload:ISSUESTYPE)=>{
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
const getSingleIssueFromDB =async(id:string)=>{

    const issueResult =await pool.query(`
        SELECT * FROM issues WHERE id = $1
        `,[id])
        const issue = issueResult.rows[0];

        const reporterResult = await pool.query(`
            SELECT id,name,role FROM users WHERE id = $1
            `,[issue.reporter_id])
        const reporter = reporterResult.rows[0];
        const formatedIssue ={
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status:issue.status,
            reporter,
            created_at: issue.created_at,
            updated_at: issue.updated_at
        }

        return formatedIssue;

}
const updateIssueIntoDB = async(id:string,payload:IIssue)=>{
    const {title, description,type,status} =payload;

    const result = await pool.query(`
            UPDATE issues SET
            title=COALESCE($1,title),
            description=COALESCE($2,description),
            type = COALESCE($3,type),
            status=COALESCE($4,status) WHERE id = $5 RETURNING *
        `,[title,description,type,status,id])
        return result;


}
const deleteIssueFromDB = async(id:string)=>{
      const result = await pool.query(`
        DELETE FROM issues WHERE id =$1
        `,[id])
        return result;
}
export const issuesService ={
    createIssue,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    updateIssueIntoDB,
    deleteIssueFromDB
}