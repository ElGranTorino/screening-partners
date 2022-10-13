import newspaperjs from "newspaperjs";
import puppeteer from "puppeteer";
import Keyword from "../../models/KeywordModel.js";
import useProxy from "puppeteer-page-proxy";
import jwt from "jsonwebtoken";

import {
    search
} from "../../modules/google-news-scraper.js"

export default class BaseService {
    // Get list of all keywords
    public getKeyWords(): Promise < any > {
        return new Promise((resolve, reject) => {
            (async () => {
                await Keyword.findAll()
                            .then((keywords) => {
                                resolve(keywords);
                            }).catch((err) => {
                                reject(err);
                            })
            })();
        })
    }

    // Create new keyword
    public createKeyWord(newKeyword: string): Promise < any > {
        return new Promise((resolve, reject) => {
            (async () => {
                await Keyword.create({
                    name: newKeyword
                }).then((created) => {
                    resolve(created)
                }).catch((err) => {
                    reject(err)
                })
                
            })();
        })
    }

    // Delete keyword by id
    public deleteKeyWord(keyWordId: string): Promise < any > {
        console.log(keyWordId)
        return new Promise((resolve, reject) => {
            (async () => {
                await Keyword.destroy({
                    where: {
                        _id: keyWordId
                    }
                }).then((deleted) => {
                    resolve(deleted)
                }).catch((err) => {
                    reject(err)
                })
                
            })();
        })
    }

    // Perform google scraping. Returns list of Promises<Articles>
    public async scrapeGoogleNews(reqTarget: string): Promise < any > {
        const keyWordsList = await this.getKeyWords();
        // const words = keyWordsList.map((w: any) => w.name);
        const words = ['invesitgation']
        const google = new Google();
        await google.setup()
        const results = await google.scrape(words, reqTarget)

        
        return results
    }

    // Login the admin
    public authenticate(reqData: any): Promise < any > {
        return new Promise((resolve, reject) => {
            if (
                reqData.login === process.env.ADMIN_LOGIN &&
                reqData.password === process.env.ADMIN_PASSWORD
            ) {
                const token = jwt.sign({
                    _id: process.env.ADMIN_ID
                }, process.env.TOKEN)
                resolve(token)
            } else {
                reject({message: 'Wrong password'})
            }
        })
    }
}
class Google {
    public NEWSCRAPER: any;
    public LAUNCH_PUPPETEER_OPTS: any;
    public PAGE_PUPPETEER_OPTS: any;
    public BROWSER: any;
    public PAGE: any;
    constructor(){
        this.NEWSCRAPER = newspaperjs.Article;
        this.LAUNCH_PUPPETEER_OPTS = {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920x1080',
                // `--proxy-server=${proxy}`
            ],
            headless: false
        };
        
        this.PAGE_PUPPETEER_OPTS = {
            networkIdle2Timeout: 5000,
            waitUntil: 'networkidle2',
            timeout: 60000
        }
    }

    async setup(){
        try {
            this.BROWSER = await puppeteer.launch(this.LAUNCH_PUPPETEER_OPTS)
        } catch (err) {
            throw new Error(err)
        }
    }
    
    async scrape(keywords: any, target: any){
        
        try {
            const scrapeResults = [];
            for(let k = 0; k < keywords.length; k++){
                const QUERY_STRING = encodeURIComponent(`"${keywords[k]} ${target}"`);
                const START = 0;
                const URL = `https://www.google.com/search?q=${QUERY_STRING}&tbm=nws&start=${START}&hl=en`;

                const PAGE = (await this.BROWSER.pages())[0];
                const USERNAME = 'newcomplianceproject';
                const PASSWORD = 'm78DxmRQ6x';
                const proxy: String = `http://${USERNAME}:${PASSWORD}@176.96.92.69:50100`;
                await PAGE.setExtraHTTPHeaders({
                    'Accept-Language': 'en-US,en;q=0.9'
                }); 
                await useProxy(PAGE, proxy);
                await PAGE.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
                await PAGE.goto(URL, this.PAGE_PUPPETEER_OPTS)
                await PAGE.waitForSelector('#yDmH0d')
                await PAGE.click("#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > div.CxJub > div.VtwTSb > form:nth-child(2) > div > div > button")
                await PAGE.waitForSelector('.CEMjEf.NUnG9d')
                const googleParsingResults = await PAGE.evaluate(() => {
                    const $articles = Array.from(document.querySelectorAll('.SoaBEf.xuvV6b'));
                    return $articles.map(($article) => {
                        const source = $article.querySelector('.CEMjEf.NUnG9d').textContent;
                        const title = $article.querySelector('.mCBkyc.y355M.ynAwRc.MBeuO').textContent;
                        const body = $article.querySelector('.GI74Re').textContent;
                        const url = $article.querySelector('.WlydOe').getAttribute('href');
                        const date = $article.querySelector('.OSrXXb.ZE0LJd').textContent;
                        return {
                            source, title, body, url, date
                        }
                    })
                });
                const response = [];
                for(let a = 0; a < googleParsingResults.length; a++){
                    try {
                        const article = await this.NEWSCRAPER(googleParsingResults[a].url)
                        const responseItem = googleParsingResults[a]
                        
                        if(article) responseItem.article = article
                        
                        response.push(responseItem)
                    } catch (error) {
                        continue;
                    }
                }
                scrapeResults.push(...response)
            }
            await this.BROWSER.close()
            return scrapeResults
        } catch (err) {
            throw new Error(err)
        }
    }

}
