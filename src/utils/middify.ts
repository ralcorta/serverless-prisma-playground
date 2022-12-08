import middy from "@middy/core";
import errorLoggerMiddleware from "@middy/error-logger";
import httpCorsMiddleware from "@middy/http-cors";
import httpErrorHandlerMiddleware from "@middy/http-error-handler";
import httpEventNormalizerMiddleware from "@middy/http-event-normalizer";
import httpHeaderNormalizerMiddleware from "@middy/http-header-normalizer";
import httpJsonBodyParserMiddleware from "@middy/http-json-body-parser";
import httpSecurityHeadersMiddleware from "@middy/http-security-headers";
import httpUrlencodeBodyParserMiddleware from "@middy/http-urlencode-body-parser";
import httpUrlencodePathParametersParserMiddleware from "@middy/http-urlencode-path-parser";

export const middyfy = (handler, ...middlewares: any[]) => {
  let middyHandler = middy(handler)
    .use(errorLoggerMiddleware())
    .use(httpEventNormalizerMiddleware())
    .use(httpHeaderNormalizerMiddleware())
    .use(httpUrlencodePathParametersParserMiddleware())
    // Start oneOf
    .use(httpUrlencodeBodyParserMiddleware())
    .use(httpJsonBodyParserMiddleware())
    // .use(httpMultipartBodyParserMiddleware())
    // End oneOf
    .use(httpSecurityHeadersMiddleware())
    .use(httpCorsMiddleware())
    .use(httpErrorHandlerMiddleware());

  for (const m of middlewares) {
    middyHandler.use(m);
  }

  return middyHandler;
};
