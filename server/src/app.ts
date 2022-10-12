// Importing dependencies
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import path from "path"
import https from "https";
import fs from 'fs';
import env from "./config/env.js"
import Table from "cli-table3"
import colors from "colors";

// Importing app routes
import CoreRoutes from "./API/routes/Core.Routes.js"
import SanctionRoutes from "./API/routes/Sanction.Routes.js"
import AuthRoutes from "./API/routes/AuthRoutes.js"
import ScrapeRoutes from "./API/routes/Scrape.Routes.js"

// Importing services
import SanctionService from "./API/services/Sanction.service.js"

//Importing loaders
import Session from "./loaders/session.js";

const __dirname = path.resolve(); // Getting the root directory
const s = new SanctionService() 

class App {
    private app: express.Application;
    private PORT: number;
    private SESSION_SECRET: string;
    private NODE_ENV: string;

    constructor() {
        this.NODE_ENV = env.env|| 'development';
        this.PORT = env.application.port || 3000;
        this.SESSION_SECRET = env.session.secret || 'session_secret';
        this.app = express();

        this.setupEnvironment();
        this.initSession()
        this.setStatic();
        this.setCors();
        this.setupRoutes();

        // this.setupDB()

        // Run the application after creating instance of a class
        this.run();
    }
    
    private setupEnvironment(): void {
        /**
         * Specifiing the path to .env file, according to NODE_ENV
         */

        /**
         * Forsing application to understand JSON and data from forms
         */
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
    }
    private setupDB(): void {
        s.updateSanctions().then((r) => {
            console.log('Sanctions updated')
        });
    }
    private setCors(): void {
        /**
         * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS - about CORS
         * If we specify origin like www.example.com always some shit happens
         * that`s why we use origin: all
         */
        this.app.use(cors({ credentials: true, origin: true}));
    }
    private initSession(): void {
        /**
         * Creating an instance of session handler, an specifiying two required parameter
         * the first one is an express application and the second one is a session secret phrase
         * which we get from .env file
         */
        const session = new Session(this.app, this.SESSION_SECRET);
        session.init();
    }
    setStatic(): void {
        /**
         * Static directory is a folder where we store all files (images, videos, audio, etc.) that 
         * are related to our application.
         */
    }
    private setupRoutes(): void {
        this.app.use('/api', CoreRoutes);
        this.app.use('/scrape', ScrapeRoutes);
        this.app.use(SanctionRoutes);
        this.app.use(AuthRoutes)
    }
    private run(): void {
        try {
            if (this.NODE_ENV === 'development') {
                // Run express apllication on specified port
                this.app.listen(this.PORT, () => {
                    console.log(`Server is up and running in development mode on port ${this.PORT}`)
                });
            } else if (this.NODE_ENV === 'production') {
                /**
                 * If we run application in production mode we need to specify paths to private key, and 
                 * certificate files.
                 * 
                 * Instructions how to get let`s encrypt free ssl cetificate:
                 * https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-20-04
                 */
                const options = {
                    key: fs.readFileSync(path.join(__dirname, 'ssl/privkey.pem')),
                    cert: fs.readFileSync(path.join(__dirname, 'ssl/cert.pem')),
                };

                // https.createServer method takes to parameters the first one is options
                // and the second one is an express app.
                https.createServer(options, this.app).listen(this.PORT, () => {
                    console.log(`Server is up and running in production mode on port ${this.PORT}`)
                });
            }
            
            /**
             * Simple console table with all basic information about the application like:
             * launch speed, environment, process PID, Version, database name, host, port etc.
             */
            let table = new Table({
                chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '|'
                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
                colWidths: [50, 40]
              });
              
              table.push(
                    [colors.blue('Time'), Date.now()],
                    [colors.blue('Launched in'), '2034 ms'],
                    [colors.blue('Environment'), this.NODE_ENV],
                    [colors.blue('Process pid'), '47312'],
                    [colors.blue('Version'), '4.1.2'],
                    [colors.blue('DBMS'), 'Postgres'],
                    [colors.blue('Database host'), 'http://localhost'],
                    [colors.blue('Database port'), '5432'],
                    [colors.blue('Database name'), 'sp_DB'],
                    [colors.blue('Database admin'), 'sp_admin'],
              );
              
              console.log(table.toString());
        } catch (err) {
            console.log(`An errror occured while starting the application`)
        }
    }
}

new App();
