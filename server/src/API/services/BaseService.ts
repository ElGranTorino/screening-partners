import jwt from "jsonwebtoken"
import Keyword from "../../models/KeywordModel.js" 
import { search } from "../../modules/google-news-scraper.js"

export default class BaseService {
  // Get list of all keywords
  public getKeyWords(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const keywords = Keyword.findAll();
        resolve(keywords);
      } catch(e) {
        reject(e);
      }
    })
  }

  // Create new keyword
  public createKeyWord(newKeyword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const created = Keyword.create({
          name: newKeyword
        })
        resolve(created);
      } catch(e) {
        reject(e);
      }
    })
  }

  // Delete keyword by id
  public deleteKeyWord(keyWordId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const deleted = Keyword.destroy({
          where: {
            _id: keyWordId
          }
        });
        resolve(deleted);
      } catch (e) {
        reject(e)
      }
    })
  }
  
  // Perform google scraping. Returns list of Promises<Articles>
  public async initSearch(reqData: string): Promise<any> {
    const keyWordsList = await this.getKeyWords();
    const words = keyWordsList?.map((word: any) => word.name) || [];
    const promises = words.reduce((acc: any, word: string, i:number, arr: any) => {
      const promise = new Promise((resolve, reject) => {
        search({
          query: [reqData, word],
        }).then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
      acc.push(promise)
      return acc
    }, [])
    
    return promises
  }

  // Login the admin
  public signIn(reqData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if(
        reqData.login === process.env.ADMIN_LOGIN &&
        reqData.password === process.env.ADMIN_PASSWORD
        ) {
          const token = jwt.sign({_id: process.env.ADMIN_ID}, process.env.TOKEN)
          resolve({token})
        } else {
          reject({success: false})
        }
    })
  }
}

