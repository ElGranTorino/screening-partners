import jwt from "jsonwebtoken";
import Keyword from "../../models/KeywordModel.js";
import { search } from "../../modules/google-news-scraper.js";
export default class BaseService {
    // Get list of all keywords
    getKeyWords() {
        return new Promise((resolve, reject) => {
            try {
                const keywords = Keyword.findAll();
                resolve(keywords);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // Create new keyword
    createKeyWord(newKeyword) {
        return new Promise((resolve, reject) => {
            try {
                const created = Keyword.create({
                    name: newKeyword
                });
                resolve(created);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // Delete keyword by id
    deleteKeyWord(keyWordId) {
        return new Promise((resolve, reject) => {
            try {
                const deleted = Keyword.destroy({
                    where: {
                        _id: keyWordId
                    }
                });
                resolve(deleted);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // Perform google scraping. Returns list of Promises<Articles>
    async scrapeGoogleNews(reqData) {
        const keyWordsList = await this.getKeyWords();
        // const words = keyWordsList?.map((word: any) => word.name) || []; 
        const words = ['investigation', 'crime', 'corruption'];
        const promises = words.reduce((acc, word, i, arr) => {
            const promise = new Promise((resolve, reject) => {
                search({
                    query: [reqData, word],
                }).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                });
            });
            acc.push(promise);
            return acc;
        }, []);
        return promises;
    }
    // Login the admin
    authenticate(reqData) {
        return new Promise((resolve, reject) => {
            if (reqData.login === process.env.ADMIN_LOGIN &&
                reqData.password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign({
                    _id: process.env.ADMIN_ID
                }, process.env.TOKEN);
                resolve({
                    token
                });
            }
            else {
                reject({
                    success: false
                });
            }
        });
    }
}
