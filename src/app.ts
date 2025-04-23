import express from 'express';
import http from 'http';
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require('path');
import * as morgan from 'morgan';

const app: express.Application = express();

const server = http.createServer(app); // Crear el servidor HTTP usando Express

dbConnection();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(morgan.default('dev'));
app.use(express.static(path.join(__dirname, 'public')));

import router from './routes';
app.use('/api', router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
