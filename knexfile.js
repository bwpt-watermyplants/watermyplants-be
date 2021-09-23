require('dotenv').config();

const pg = require('pg');

if(process.env.DATABASE_URL) {
	pg.defaults.ssl = { rejectUnauthorized: false}
};

const sharedConfig = {
	client: 'pg',
	migrations: { directory: './data/migrations'},
	seeds: { directory: './data/seeds'},
}

module.exports = {
	development: {
		client: "sqlite3",
		useNullAsDefault: true, // needed for sqlite
		connection: {
			filename: "./data/users.db3",
		},
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},

		// this is needed when using foreign keys
		pool: {
			afterCreate: (conn, done) => {
				// runs after a connection is made to the sqlite engine
				conn.run("PRAGMA foreign_keys = ON", done) // turn on FK enforcement
			},
		},
	},

	production: {
		...sharedConfig,
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
			migrations: { directory: './data/migrations'},
			seeds: { directory: './data/seeds'},
		},
		pool: {
			min: 2,
			max: 10
		}
	}
}