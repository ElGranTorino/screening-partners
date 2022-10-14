// Importing dependencies
import session from 'express-session'
import Sequelize from 'sequelize';
import {v4 as uuidv4} from 'uuid';
import { Application } from 'express-serve-static-core';
import connectSessionSequelize from "connect-session-sequelize";

// Importing sequelize connection string
import db from "./db.js";

// Importing .env config
import env from '../config/env.js';

export default class Session {
    private SequelizeStore: any;
    private SessionStore: any;
    private app: Application;
    private secret: string

    constructor(app: Application, secret: string) {
        // Express application
        this.app = app; 

        // Session secret
        this.secret = secret; 

        // Creatiing a connector
        this.SequelizeStore = connectSessionSequelize(session.Store); 

        // Creating new sequelize store, SequelizeStore takes object as parameter,
        // Parameter key "db" - our sequelize connection
        this.SessionStore = new this.SequelizeStore({
            db: db,
        })

        // Force sequelize to create Database table if it does not exist 
        this.SessionStore.sync();
    }
    
    public init(): void {
        this.app.use(
            session({
                // Session id generation method1
                genid: () => {
                    return uuidv4()
                },
                store: this.SessionStore,
                secret: this.secret,
                resave: false,
                saveUninitialized: true,
                cookie: { 
                    maxAge: 3600 * 1000 * 24, // Save session in cookies for 24 hours
                    secure: env.env === 'production' ? true : false  // If we are in production mode -  make cookie secure
                }}
        ));
    }
}
