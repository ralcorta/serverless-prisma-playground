import { APIGatewayProxyResult } from "aws-lambda";

enum HTTP_STATUS {
  OK = 200,
  MOVED = 301,
  FOUND = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export class Response {
  static create(
    statusCode: number,
    obj: Record<string, any> | string,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    const resp: APIGatewayProxyResult = {
      statusCode,
      body: JSON.stringify(
        {
          status: statusCode,
          result: obj,
        },
        null,
        2
      ),
    };

    if (headers) resp.headers = headers;

    return resp;
  }

  static ok(
    obj: Record<string, any>,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return Response.create(HTTP_STATUS.OK, obj, headers);
  }

  static badRequest(
    obj: Record<string, any>,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return Response.create(HTTP_STATUS.BAD_REQUEST, obj, headers);
  }

  static unauthorized(
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return Response.create(HTTP_STATUS.UNAUTHORIZED, "Unauthorized", headers);
  }

  static notFound(
    obj?: Record<string, any>,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return Response.create(
      HTTP_STATUS.NOT_FOUND,
      obj || "Resource not found.",
      headers
    );
  }

  static serverError(
    obj?: Record<string, any>,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return Response.create(
      HTTP_STATUS.SERVER_ERROR,
      obj || "Server error.",
      headers
    );
  }
}
