const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const usersRouter = require('./routers/users.js');
const plantsRouter = require('./routers/plants-router.js');
const speciesRouter = require('./routers/species-router.js');
const db = require('./data/config');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    resave: false, // avoid recreating sessions that have not changed
    saveUninitialized: false, // only create sessions for users that are logged in
    secret: 'keep it secret keep it safe', // cryptographically sign the session cookie
    store: new KnexSessionStore({
      knex: db, // configured instance of knex
      createtable: true, // create a session table automatically, rather than doing a migration for it
    }),
  })
);

server.use(usersRouter);
server.use(plantsRouter);
server.use(speciesRouter);

server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: 'Something went wrong',
  });
});

module.exports = server;
