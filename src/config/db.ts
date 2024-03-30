import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config()

const url = process.env.DB_URL

const db = new Sequelize(url, {
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
});

export default db;