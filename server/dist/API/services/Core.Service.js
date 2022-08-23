import jwt from "jsonwebtoken";
import Keyword from "../../models/KeywordModel.js";
import { search } from "../../modules/google-news-scraper.js";
export default class BaseService {
    // Get list of all keywords
    getKeyWords() {
        return new Promise((resolve, reject) => {
            (async () => {
                await Keyword.findAll()
                    .then((keywords) => {
                    resolve(keywords);
                }).catch((err) => {
                    reject(err);
                });
            })();
        });
    }
    // Create new keyword
    createKeyWord(newKeyword) {
        return new Promise((resolve, reject) => {
            (async () => {
                await Keyword.create({
                    name: newKeyword
                }).then((created) => {
                    resolve(created);
                }).catch((err) => {
                    reject(err);
                });
            })();
        });
    }
    // Delete keyword by id
    deleteKeyWord(keyWordId) {
        return new Promise((resolve, reject) => {
            (async () => {
                await Keyword.destroy({
                    where: {
                        _id: keyWordId
                    }
                }).then((deleted) => {
                    resolve(deleted);
                }).catch((err) => {
                    reject(err);
                });
            })();
        });
    }
    // Perform google scraping. Returns list of Promises<Articles>
    async scrapeGoogleNews(reqData) {
        const keyWordsList = await this.getKeyWords();
        const words = keyWordsList?.map((word) => word.name) || [];
        // const words = ['investigation', 'crime', 'corruption']
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
                resolve(token);
            }
            else {
                reject({ message: 'Wrong password' });
            }
        });
    }
}
