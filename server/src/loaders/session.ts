import session from 'express-session'
import Sequelize from 'sequelize';
import db from "./db.js";
import connectSessionSequelize from "connect-session-sequelize";
import { Application } from 'express-serve-static-core';
import { v4 as uuidv4 } from 'uuid';
export default class Session {
    private SequelizeStore: any;
    private SessionStore: any;
    private app: Application;
    private secret: string

    constructor(app: Application, secret: string) {
        this.app = app;
        this.secret = secret;

        this.SequelizeStore = connectSessionSequelize(session.Store);
        this.SessionStore = new this.SequelizeStore({
            db: db,
        })

        this.SessionStore.sync();
    }

    public init(): void {
        this.app.use(
            session({
                genid: () => {
                    return uuidv4()
                },
                store: this.SessionStore,
                secret: this.secret,
                resave: false,
                saveUninitialized: true,
                cookie: { 
                    maxAge: 3600 * 1000 * 24, 
                    secure: process.env.NODE_ENV === 'production' ? true : false 
                }}
        ));
    }
}
