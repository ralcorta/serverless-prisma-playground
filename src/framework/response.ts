import { APIGatewayProxyResult } from 'aws-lambda';
import { HttpStatusCode } from '../core/enums';
import createHttpError from 'http-errors';

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
					result: obj
				},
				null,
				2
			)
		};
		if (headers) resp.headers = headers;
		return resp;
	}

	static createError(code: HttpStatusCode, message: string): Error {
		throw createHttpError(code, message);
	}

	static ok(obj: Record<string, any>, headers?: Record<string, boolean | number | string>): APIGatewayProxyResult {
		return Response.create(HttpStatusCode.OK, obj, headers);
	}

	static badRequest(message?: string): Error {
		return Response.createError(HttpStatusCode.BAD_REQUEST, message ?? 'Bad request.');
	}

	static unauthorized(message?: string): Error {
		return Response.createError(HttpStatusCode.UNAUTHORIZED, message ?? 'Unauthorized');
	}

	static notFound(message?: string): Error {
		return Response.createError(HttpStatusCode.NOT_FOUND, message ?? 'Resource not found.');
	}

	static serverError(message?: string): Error {
		return Response.createError(HttpStatusCode.SERVER_ERROR, message ?? 'Server error.');
	}
}
