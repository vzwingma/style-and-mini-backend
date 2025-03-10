import dotenv from 'dotenv';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

dotenv.config();


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('AWS Lambda event', event);
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello Style And Mini from APP',
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
