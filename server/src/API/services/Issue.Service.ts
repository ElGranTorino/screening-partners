import jwt from "jsonwebtoken"
import Issue from "../../models/Issue.Model.js"

export default class IssueService {
    // Get list of all keywords
    public selectIssues(params): Promise < any > {
        return new Promise((resolve, reject) => {
            const {page = 1, limit = 50} = params;
                (async () => {
                   await Issue.findAll({}).then((data) => {
                    resolve(data)
                   }).catch((err) => {
                    reject(err)
                   })
                })();
        })
    }
    public insertIssue(params): Promise < any > {
        return new Promise((resolve, reject) => {
            const {type = 'Sanctions data isssue', target, message = ''} = params;
                (async () => {
                   await Issue.create({
                    type, target, message
                   }).then((data) => {
                    resolve(data)
                   }).catch((err) => {
                    reject(err)
                   })
                })();
        })
    }

}