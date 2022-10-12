import "express-session";
import { Response, Request } from "express"
import BaseService from "../services/Core.Service.js"
import Total from "../../models/TotalResults.js"
// Updating SessionData interface by adding 'user' field in it
declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

// Creating new instance of BaseSerivce
const s =  new BaseService();
export default class BaseController {
  public isVerified(req: Request, res: Response): any {
    if(req.session.user) {
      res.json({verified: true})
    } else {
        res.json({verified: false})
    }
  }
  
  // Get value of how many times searches have been performed on the website
  public getTotalRequests(req: Request, res: Response): Promise<any> {
    return new Promise((resolve, reject) => {
      Total.findAll()
          .then((count) => {
            res.json(count.length)
          }).catch((err) => {
            res.status(400).json(err)
          })
    })
  }

  /**
   * Update total results count. Every time user perform a search total counts increments by two
   * @param req 
   * @param res 
   * @returns Promise
   */
  public postTotalResults(req: Request, res: Response): Promise<any> {
    return new Promise((resolve, reject) => {
      Total.create({}).then((data) => {
        res.json(data)
      }).catch((err) => {
        res.status(400).json(err);
      })
        
    })
  }

  // Get scraping results
  public getGoogleNews(req: Request, res: Response): Promise<void>{
    return s.scrapeGoogleNews(`${req.query.q}`)
                  .then((data) => {
                    res.json(data);
                  })
  }

  // Login Admin on the website
  public login(req: Request, res: Response): Promise<void>{
      return s.authenticate(req.body)
                   .then((data) => {
                     req.session.user = data
                     res.json(req.session.user)
                   }).catch((e) => {
                      res.status(400).json(e)
                   })
  }

  // Get list of keywords from database
  public getAllKeyWords(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      s.getKeyWords()
        .then((data) => {
          res.json(data)
        }).catch((e) => {
          res.json(e);
        })
    })
  }

  // Create new keyword
  public postKeyWord(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      s.createKeyWord(req.body.name)
        .then((data) => {
          res.json(data)
        }).catch((e) => {
          res.json(e)
        })

    })
  }
  
  // Delete keyword from database
  public deleteKeyWord(req: Request, res: Response): Promise<void> {
    console.log(req.body)
    return new Promise((resolve, reject) => {
      s.deleteKeyWord(req.body.id)
        .then((data) => {
          res.json(data)
        }).catch((e) => {
          res.json(e)
        })

    })
  }
}