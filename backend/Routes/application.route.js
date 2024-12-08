import express from 'express'
const router = express.Router();
import { applyJob, getApplicant, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.route("/applyJob/:").post( isAuthenticated,applyJob)
router.route("/getJob").get(isAuthenticated,getAppliedJobs)
router.route("/getApplicants/:id").get(isAuthenticated,getApplicant)
router.route("/statusUpdate/:id").post(isAuthenticated,updateStatus)

export default router