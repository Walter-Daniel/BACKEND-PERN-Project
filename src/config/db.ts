import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

const url = process.env.DB_URL

const db = new Sequelize(url);

export default db;