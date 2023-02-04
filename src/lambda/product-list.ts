import 'reflect-metadata';
import { pathExtensionless } from './../core/utils/path-resolver';
import { middyfy } from '@framework/middify';
import { Handler } from 'aws-lambda';
import { ProductController } from '../product/product-controller';
import { diContainer } from '@framework/di';

export const handler: Handler = middyfy(async () => diContainer.resolve<ProductController>(ProductController).list());

export const productList = {
	handler: `${pathExtensionless(__filename)}.handler`,
	events: [
		{
			http: {
				method: 'POST',
				path: '/product'
			}
		}
	]
};
