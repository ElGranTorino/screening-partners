import CoreController from "../controllers/Core.Controller.js";
import { isAuthenticated } from "../middleware/Auth.js";
import { Router } from "express";

const c = new CoreController();
const router = Router();



router.post('/news', c.getGoogleNews) // Scrape google news


export default router;