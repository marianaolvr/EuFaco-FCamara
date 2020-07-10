require('dotenv').config();

const app = require('./app');
const http = require('http').createServer(app);

http.listen(process.env.APP_PORT || 3000, () =>
  console.log(`API rodando na porta: ${process.env.APP_PORT}...`)
);

app.io.attach(http);
