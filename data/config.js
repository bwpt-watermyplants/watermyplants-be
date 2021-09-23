const { config } = require("dotenv")
const knex = require("knex")
const knexfile = require("../knexfile")

const db = knex(process.env.NODE_ENV === 'production' ? config.production : config.development)

module.exports = knex(knexfile.development)