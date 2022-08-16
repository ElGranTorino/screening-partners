import BaseController from "../controllers/BaseController.js";
import { isAuthenticated } from "../middleware/Auth.js";
import { Router } from "express";

const c = new BaseController();
const router = Router();

//
router.post('/login', c.postLogin);

//
router.get('/keyword',isAuthenticated, c.getAllKeyWords);
router.delete('/keyword',isAuthenticated, c.deleteKeyWord);
router.post('/keyword',isAuthenticated, c.postKeyWord)

//
router.post('/search', c.getScrape)

// 
router.get('/total', c.getTotalRequests)
router.post('/total', c.postTotalResults)

export default router;