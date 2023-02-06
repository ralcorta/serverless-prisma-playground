import 'reflect-metadata';
import { lambdaPath } from './../core/utils/path-resolver';
import { middyfy } from '@framework/middify';
import { Handler } from 'aws-lambda';
import { ProductController } from '../product/product-controller';
import { diContainer } from '@framework/di';
import { HTTPMethod } from 'src/core/enums';

export const handler: Handler = middyfy(async () => diContainer.resolve<ProductController>(ProductController).list());

export const productList = {
	handler: `${lambdaPath(__filename)}.handler`,
	events: [
		{
			http: {
				method: HTTPMethod.GET,
				path: '/product'
			}
		}
	]
};
