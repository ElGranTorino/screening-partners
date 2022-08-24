import { Router } from "express";
const router = Router();
router.get('/verify', (req, res) => {
    if (req.session.user) {
        res.json({ verified: true });
    }
    else {
        res.status(403).json({ verified: false });
    }
});
export default router;
