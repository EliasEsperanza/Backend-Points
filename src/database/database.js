import dotenv from "dotenv";

dotenv.config();

import Sequelize from "sequelize";

const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databaseHost = process.env.DB_HOST;
const databaseDialect = process.env.DB_DIALECT;

export const sequelize = new Sequelize(databaseName, databaseUser, "", {
    host: databaseHost,
    dialect: databaseDialect
})