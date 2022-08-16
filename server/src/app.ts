import express from "express"
import BaseRoutes from "./API/routes/BaseRoutes.js"
import Session from "./loaders/session.js";
import bodyParser from "body-parser";
import cors from "cors"
import path from "path"
import https from "https";
import fs from 'fs';
import dotenv from "dotenv";
const __dirname = path.resolve();

class App {
    private app: express.Application; 
    private PORT: number | string;
    private session_secret: string;
    private NODE_ENV: string;

    constructor(){
        this.PORT = process.env.PORT || 3000;
        this.NODE_ENV = process.env.environment || 'development';
        this.session_secret = process.env.SESSION_SECRET || 'session_secret';
        this.app = express();
        
        this.setupEnvironment();
        this.initSession()
        this.setupDB();
        this.setStatic();
        this.setCors();
        this.setupRoutes();

        this.run();
    }
    
    private setupEnvironment(): void {
        // Providing path to .env file
        dotenv.config({
            path: './config/.env'
        })
        
        // Forcing application to understand JSON data and data from html forms
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
    }
    private setupDB(): void {
        // Setting up database connection 

    }
    private setCors(): void {
        const developmentOrigin = '*'
        const productionOrigin = [
            'https://screeningpartners.net/',
            'http://screeningpartners.net/',
            'https://www.screeningpartners.net/',
            'http://www.screeningpartners.net/'
        ]
        this.app.use(cors({
            origin: this.NODE_ENV === 'development' ? developmentOrigin : productionOrigin,
            credentials: true,
            methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH']
            // exposedHeaders: ['set-cookie']
        }));
    }
    private initSession(): void {
        /**
         * Creating an instance of session handler, an specifiying two required parameter
         */
        const session = new Session(this.app, this.session_secret);
        session.init();
    }
    setStatic(): void {
        
    }
    private setupRoutes(): void {
        this.app.use('/api', BaseRoutes);
    }
    private run(): void {
        // If application is in production mode - we need to put all traffic through https
        try {
            if(this.NODE_ENV === 'development') {
                this.app.listen(this.PORT, () => {
                    console.log(`Server is up and running in development mode on port ${this.PORT}`)
                });
            } else if (this.NODE_ENV === 'production'){
                const options = {
                    key: fs.readFileSync( path.join(__dirname, 'ssl/privkey.pem') ),
                    cert: fs.readFileSync( path.join(__dirname, 'ssl/cert.pem') ),
                }

                https.createServer(options, this.app).listen(this.PORT, () => {
                    console.log(`Server is up and running in production mode on port ${this.PORT}`)
                });
            }
        } catch (err) {
            console.log(`An errror occured while starting the application`)
        }
    }
}

new App();