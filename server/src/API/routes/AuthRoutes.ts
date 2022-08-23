import CoreController from "../controllers/Core.Controller.js";
import { isAuthenticated } from "../middleware/Auth.js";
import { Router } from "express";

const router = Router();

router.get('/verify', (req, res)=> {
    console.log(req.session)

    if(req.session.user) {
        res.json({verified: true})
    } else {
        res.status(403).json({verified: false})
    }
})


export default router;