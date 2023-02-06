import 'reflect-metadata';
import { lambdaPath } from '../core/utils/path-resolver';
import { middyfy } from '@framework/middify';
import { Handler } from 'aws-lambda';
import { ProductController } from '../product/product-controller';
import { diContainer } from '@framework/di';
import { HTTPMethod } from 'src/core/enums';
import { APIGatewayProxyEventParsed } from 'src/core/types';

export const handler: Handler = middyfy(async (event: APIGatewayProxyEventParsed) => {
	const productController = diContainer.resolve<ProductController>(ProductController);
	return productController.delete(event);
});

export const productDelete = {
	handler: `${lambdaPath(__filename)}.handler`,
	events: [
		{
			http: {
				method: HTTPMethod.DELETE,
				path: '/product'
			}
		}
	]
};
