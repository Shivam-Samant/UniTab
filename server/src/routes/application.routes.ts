import { Router } from "express";
import { applicationController } from "../controllers/application.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { asyncWrapper } from "../utils/asyncWrapper.util"

const router = Router();

router.get("/", asyncWrapper(authenticate), applicationController.getApplications);
router.get("/select", asyncWrapper(authenticate), applicationController.handleApplicationSelect);

export default router;
