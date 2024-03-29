const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    client: "pg",
    connection: process.env.DB_URL || {
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    migrations: {
        directory: "./db/migrations",
        loadExtensions: [".js"],
    },
    seeds: {
        directory: "./db/seeds",
    },
};
