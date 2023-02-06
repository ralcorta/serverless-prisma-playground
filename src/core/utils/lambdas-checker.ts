import { AWS } from '@serverless/typescript';
import { HTTPMethod } from '../enums';

type HttpEvent = { method: HTTPMethod; path: string };

export const detectAndThrowInvalidHttpLambda = (functionsConfig: AWS['functions']) => {
	const httpEvents: HttpEvent[] = [];
	for (const funcName in functionsConfig) {
		if (Object.prototype.hasOwnProperty.call(functionsConfig, funcName)) {
			const { events: eventList } = functionsConfig[funcName];
			const {
				http: { method, path }
			} = eventList.find((e) => 'http' in e) as { http: HttpEvent };
			if (httpEvents.some((e) => e.method == method && e.path == path))
				throw new Error(`[INVALID HTTP LAMBDA] Duplicated function - Path: ${path} - Method ${method}`);
			httpEvents.push({ method, path });
		}
	}
};
