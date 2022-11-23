import { Response, Request } from "express"
import SanctionService from "../services/Sanction.service.js"



// Creating new instance of BaseSerivce
const s =  new SanctionService();

export default class BaseController {

  public getSanctions(req: Request, res: Response): Promise<any> {
    const {
      target, 
      offset = req.body.offset < 1 ? 1 : req.body.offset, 
      limit = 10 } = req.body
    return new Promise((resolve, reject) => {
     s.SELECT_SANCTIONS({
      target, offset, limit
      }).then((data: any) => {
        res.json(data)
      }).catch((err: any) => {
        res.status(400).json({err})
      })
    })
  }

  public async getPEPs(req: Request, res: Response): Promise<any> {
    const query = req.body;
    s.SELECT_PEPS(query)
      .then((data: any) => {
        res.json(data)
      }).catch((err) => {
        console.log(err)
        res.status(400).json({err})
      })
  }
}