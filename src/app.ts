import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import * as middlewares from './api/interfaces/middlewares';
import api from './api';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

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

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('AWS Lambda event', event);
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello Style And Mini',
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};
