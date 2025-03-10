import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import * as middlewares from './api/interfaces/middlewares';
import api from './api';
import { BACKEND_PORT } from './constants/AppConstants';
import { connectToDatabase } from './services/Mongodb.Service';

const serverless = require('serverless-http');
dotenv.config();


export const app = express();

const startApp = () => {
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());


  app.use('/api/v1', api);

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

};
startApp();


const handler = serverless(app);

const port = BACKEND_PORT;
const startServer = async () => {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://0.0.0.0:${port}`);
    /* eslint-enable no-console */
    connectToDatabase();
  });
};

startServer();


export const lambdaHandler = (event: any, context: any, callback: any) => {
  const response = handler(event, context, callback);
  return response;
};