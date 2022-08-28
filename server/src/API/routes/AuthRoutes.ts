import CoreController from "../controllers/Core.Controller.js";
import { isAuthenticated } from "../middleware/Auth.js";
import { Router } from "express";
import BaseController from "../controllers/Core.Controller.js";

const router = Router();
const c = new BaseController();
router.get('/verify', c.isVerified)


export default router;