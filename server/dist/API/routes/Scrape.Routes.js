import SanctionController from "../controllers/Sanction.Controller.js";
import CoreController from "../controllers/Core.Controller.js";
import { Router } from "express";
const s = new SanctionController();
const c = new CoreController();
const router = Router();
router.get('/init', s.postSanctions);
router.post('/sanctions', s.getSanctions);
router.post('/news', c.getGoogleNews); // Scrape google news
export default router;
