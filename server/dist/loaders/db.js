import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({
    path: './config/.env'
});
let connection;
if (process.env.NODE_ENV === 'development') {
    // connection = new Sequelize({
    //     dialect: 'sqlite',
    //     storage: './db/euphoria.sqlite3',
    //     logging: false,
    // });
    connection = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_LOGIN}`, `${process.env.DB_PASSWORD}`, {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false,
    });
}
else if (process.env.NODE_ENV === 'production') {
    connection = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_LOGIN}`, `${process.env.DB_PASSWORD}`, {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
    // const [database, username, password] = [process.env.DB_NAME || '', 
    //                                         process.env.DB_LOGIN || '', 
    //                                         process.env.DB_PASSWORD || '']
    // connection = new Sequelize(database, username, password, {
    //     host: process.env.DB_HOST,
    //     dialect: "postgres",
    //     logging: false,
    // });
}
(async function () {
    try {
        if (connection)
            connection.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('An error occured while connecting to the database');
    }
})();
export default connection;
