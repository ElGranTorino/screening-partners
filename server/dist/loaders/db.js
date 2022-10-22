import { Sequelize } from "sequelize";
import env from "../config/env.js";
const connection = new Sequelize(`${env.db.name}`, `${env.db.login}`, `${env.db.pass}`, {
    host: 'localhost',
    dialect: 'postgres',
    logging: env.env === 'production' ? false : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 300000,
        idle: 5000
    }
});
(async function () {
    try {
        if (connection)
            await connection.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('An error occured while connecting to the database');
    }
})();
export default connection;
