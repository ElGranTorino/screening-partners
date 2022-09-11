import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(path.resolve(), `config/.env.${process.env.NODE_ENV}`)
})

export default {
    env: process.env.NODE_ENV,
    application: {
        host: process.env.HOST,
        port: +process.env.PORT
    },
    auth: {
        login: process.env.ADMIN_LOGIN,
        password: process.env.ADMIN_PASSWORD
    },
    db: {
        name: process.env.DB_NAME,
        login: process.env.DB_LOGIN,
        pass: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT
    },
    session: {
        secret: process.env.SESSION_SECRET
    },
    other: {
        JWT: process.env.JWT,
    }
}