import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

export type APIGatewayProxyEventParsed<T = Record<string, any>> = Exclude<
  APIGatewayProxyEvent,
  "body"
> & { body: T };

export type APIGatewayProxyHandlerParsed = Handler<
  APIGatewayProxyEventParsed,
  APIGatewayProxyResult
>;
