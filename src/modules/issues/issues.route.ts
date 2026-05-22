import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from './../../middleware/auth';
import { USER_ROLE } from "../../types";
import updateAccess from "../../middleware/updateAccess";

const router = Router();
router.post("/",auth(USER_ROLE.contributor,USER_ROLE.maintainer),issuesController.createIssue)
router.get("/",issuesController.getAllUser)
router.get("/:id",issuesController.getSingleUser)
router.patch("/:id",auth(USER_ROLE.contributor,USER_ROLE.maintainer),updateAccess(),issuesController.updateIssue)
router.delete("/:id",auth(USER_ROLE.maintainer),issuesController.deleteIssue)

export const issuesRouter = router;