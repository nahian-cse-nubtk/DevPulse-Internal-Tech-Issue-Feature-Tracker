import type { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import sendResponse from "../utility/sendResponse";
import type { JwtPayload } from "jsonwebtoken";

const updateAccess = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id, role } = req.user as JwtPayload;


    try {
      const issueResult = await pool.query(
        `
        SELECT * FROM issues WHERE id=$1
            `,
        [req.params.id],
      );
      const issue = issueResult.rows[0];

      if (role === "contributor" && issue.reporter_id === id && issue.status === "open" && !req.body.status){
        next();
      } else if (role === "maintainer") {
        next();
      } else {
        sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Access Forbidden",
        });
      }
    } catch (error: any) {
      next(error);
    }
  };
};

export default updateAccess;
