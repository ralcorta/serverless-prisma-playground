import 'reflect-metadata';
import { middyfy } from '@framework/middify';
import { APIGatewayProxyEventParsed } from '../core/types';
import { Handler } from 'aws-lambda';
import { ProductController } from '../product/product-controller';
import { diContainer } from '@framework/di';
import { lambdaPath } from 'src/core/utils/path-resolver';
import { HTTPMethod } from 'src/core/enums';

export const hanhdler: Handler = middyfy(async (event: APIGatewayProxyEventParsed) => diContainer.resolve(ProductController).create(event));

export const productCreate = {
	handler: `${lambdaPath(__filename)}.handler`,
	events: [
		{
			http: {
				method: HTTPMethod.POST,
				path: '/product'
			}
		}
	]
};
