require("dotenv").config();

const config =  {
    urlDB: process.env.URLDB,
    SECRET_KEY: process.env.SECRET_KEY
}

module.exports = config;