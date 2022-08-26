import SanctionService from "../services/Sanction.service.js";
// Creating new instance of BaseSerivce
const s = new SanctionService();
export default class BaseController {
    // Get value of how many times searches have been performed on the website
    // public postSanctions(req: Request, res: Response): Promise<any> {
    //   return new Promise((resolve, reject) => {
    //    s.INSERT_SANCTIONS()
    //     .then((data: any) => {
    //       res.json({success:true})
    //     }).catch((err: any) => {
    //       res.status(400).json({err})
    //     })
    //   })
    // }
    getSanctions(req, res) {
        const { target, page = 1, limit = 10 } = req.body;
        return new Promise((resolve, reject) => {
            s.SELECT_SANCTIONS({
                target, page, limit
            }).then((data) => {
                res.json(data);
            }).catch((err) => {
                res.status(400).json({ err });
            });
        });
    }
}
