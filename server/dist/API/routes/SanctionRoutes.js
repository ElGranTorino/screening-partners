import SanctionController from "../controllers/Sanction.Controller.js";
import { Router } from "express";
const c = new SanctionController();
const router = Router();
router.get('/sanctions', c.postSanctions);
export default router;
