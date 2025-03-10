import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('AWS Lambda event', event);
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello Style And Mini from INDEX',
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
