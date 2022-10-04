import SanctionService from "../services/Sanction.service.js";
// Creating new instance of BaseSerivce
const s = new SanctionService();
export default class BaseController {
    getSanctions(req, res) {
        const { target, offset = 1, limit = 10 } = req.body;
        return new Promise((resolve, reject) => {
            s.SELECT_SANCTIONS({
                target, offset, limit
            }).then((data) => {
                res.json(data);
            }).catch((err) => {
                res.status(400).json({ err });
            });
        });
    }
}
