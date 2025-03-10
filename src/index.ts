import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import { app } from './app';
import { BACKEND_PORT } from './constants/AppConstants';
/*
const port = BACKEND_PORT;
app.listen(port, () => {

  console.log(`Listening: http://0.0.0.0:${port}`);

});
*/


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
