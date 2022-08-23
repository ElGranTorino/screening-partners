import "express-session";
import BaseService from "../services/BaseService.js";
import Total from "../../models/TotalResults.js";
// Creating new instance of BaseSerivce
const s = new BaseService();
export default class BaseController {
    // Get value of how many times searches have been performed on the website
    getTotalRequests(req, res) {
        return new Promise((resolve, reject) => {
            Total.findAll()
                .then((count) => {
                res.json(count.length);
            }).catch((err) => {
                res.status(400).json(err);
            });
        });
    }
    // Update total results count. Every time user perform a search
    // total counts increments by two
    postTotalResults(req, res) {
        return new Promise((resolve, reject) => {
            Total.create({}).then((data) => {
                res.json(data);
            }).catch((err) => {
                res.status(400).json(err);
            });
        });
    }
    // Get scraping results
    getGoogleNews(req, res) {
        return s.scrapeGoogleNews(req.body.name)
            .then((data) => {
            (Promise.all(data).then((resp) => {
                res.json(resp.flat(2));
            }));
        }).catch((e) => {
            res.status(400).json(e);
        });
    }
    // Login Admin on the website
    login(req, res) {
        return s.authenticate(req.body)
            .then((data) => {
            req.session.user = process.env.ADMIN_ID;
            res.json(req.session.user);
        }).catch((e) => {
            res.status(400).json(e);
        });
    }
    // Get list of keywords from database
    getAllKeyWords(req, res) {
        return new Promise((resolve, reject) => {
            s.getKeyWords()
                .then((data) => {
                res.json({ data });
            }).catch((e) => {
                res.json(e);
            });
        });
    }
    // Create new keyword
    postKeyWord(req, res) {
        return new Promise((resolve, reject) => {
            s.createKeyWord(req.body.name)
                .then((data) => {
                res.json(data);
            }).catch((e) => {
                res.json(e);
            });
        });
    }
    // Delete keyword from database
    deleteKeyWord(req, res) {
        return new Promise((resolve, reject) => {
            s.deleteKeyWord(req.body.id)
                .then((data) => {
                res.json(data);
            }).catch((e) => {
                res.json(e);
            });
        });
    }
}
