import { Response, Request } from "express"
import SanctionService from "../services/Sanction.service.js"



// Creating new instance of BaseSerivce
const s =  new SanctionService();

export default class BaseController {

  public getSanctions(req: Request, res: Response): Promise<any> {
    const {target, offset = 1, limit = 10} = req.body
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
}