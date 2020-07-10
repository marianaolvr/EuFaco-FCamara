const express = require('express');
const socket = require('socket.io');
const handleSocketConn = require('./lib/socket-io');
const cors = require('cors');
const handleRoutes = require('./routes');
const httpErrors = require('./middlewares/http-erros');
const auth = require('./middlewares/auth');

class App {
  constructor() {
    this.app = express();
    this.app.io = socket();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(auth().initialize());

    handleSocketConn({ io: this.app.io });
  }

  routes() {
    handleRoutes({ app: this.app, auth: auth().authenticate() });
    this.app.use((error, req, res, next) => httpErrors(error, req, res, next));
  }
}

module.exports = new App().app;
