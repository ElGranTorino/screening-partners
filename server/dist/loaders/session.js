import session from 'express-session';
import db from "./db.js";
import connectSessionSequelize from "connect-session-sequelize";
import { v4 as uuidv4 } from 'uuid';
export default class Session {
    SequelizeStore;
    SessionStore;
    app;
    secret;
    constructor(app, secret) {
        this.app = app;
        this.secret = secret;
        this.SequelizeStore = connectSessionSequelize(session.Store);
        this.SessionStore = new this.SequelizeStore({
            db: db,
        });
        this.SessionStore.sync();
    }
    init() {
        this.app.use(session({
            genid: () => {
                return uuidv4();
            },
            store: this.SessionStore,
            secret: this.secret,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 3600 * 1000 * 24,
                secure: process.env.NODE_ENV === 'production' ? true : false
            }
        }));
    }
}
