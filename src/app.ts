import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import * as middlewares from './api/interfaces/middlewares';
import api from './api';
import { BACKEND_PORT } from './constants/AppConstants';

const serverless = require('serverless-http');
dotenv.config();


export const app = express();

/**
 * Initialise les routes de l'application.
 * 
 * Cette fonction configure les middlewares suivants :
 * - `morgan` pour le logging des requêtes HTTP en mode développement.
 * - `helmet` pour sécuriser l'application en configurant divers en-têtes HTTP.
 * - `cors` pour permettre les requêtes cross-origin.
 * - `express.json` pour parser les requêtes JSON.
 * 
 * Ensuite, elle configure les routes de l'API version 1 (`/api/v1`) et les middlewares de gestion des erreurs :
 * - `middlewares.notFound` pour gérer les routes non trouvées.
 * - `middlewares.errorHandler` pour gérer les erreurs de l'application.
 */
const initAppRoutes = () => {
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());


  app.use('/api/v1', api);

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

};


// Mapper Serverless
const handler = serverless(app);

const port = BACKEND_PORT;
const startServer = async () => {
  initAppRoutes();
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://0.0.0.0:${port}`);
    /* eslint-enable no-console */
  });
};

startServer();


export const lambdaHandler = (event: any, context: any, callback: any) => {
  const response = handler(event, context, callback);
  return response;
};