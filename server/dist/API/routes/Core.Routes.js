import CoreController from "../controllers/Core.Controller.js";
import { Router } from "express";
const c = new CoreController();
const router = Router();
//
router.post('/login', c.login);
router.post('/issue', c.createSearchDataIssue);
router.get('/issue', c.findAllDataIssues);
//
router.delete('/keyword', c.deleteKeyWord);
router.get('/keyword', c.getAllKeyWords);
router.post('/keyword', c.postKeyWord);
// 
router.get('/total', c.getTotalRequests);
router.post('/total', c.postTotalResults);
export default router;
