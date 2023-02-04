import 'reflect-metadata';
import { middyfy } from '@framework/middify';
import { APIGatewayProxyEventParsed } from '../core/types';
import { Handler } from 'aws-lambda';
import { ProductController } from '../product/product-controller';
import { diContainer } from '@framework/di';
import { pathExtensionless } from 'src/core/utils/path-resolver';

export const hanhdler: Handler = middyfy(async (event: APIGatewayProxyEventParsed) => diContainer.resolve(ProductController).create(event));

export const productCreate = {
	handler: `${pathExtensionless(__filename)}.handler`,
	events: [
		{
			http: {
				method: 'GET',
				path: '/product'
			}
		}
	]
};
