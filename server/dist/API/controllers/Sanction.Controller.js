import SanctionService from "../services/Sanction.service.js";
// Creating new instance of BaseSerivce
const s = new SanctionService();
export default class BaseController {
    // Get value of how many times searches have been performed on the website
    postSanctions(req, res) {
        return new Promise((resolve, reject) => {
            s.INSERT_SANCTIONS()
                .then((data) => {
                res.json({ success: true });
            }).catch((err) => {
                res.status(400).json({ err });
            });
        });
    }
    getSanctions(req, res) {
        return new Promise((resolve, reject) => {
            console.log();
            s.SELECT_SANCTIONS(String(req.query.q))
                .then((data) => {
                res.json(data);
            }).catch((err) => {
                res.status(400).json({ err });
            });
        });
    }
}
