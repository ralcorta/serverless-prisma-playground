import 'reflect-metadata';
import { middyfy } from '@framework/middify';
import { Handler } from 'aws-lambda';
import { ProductController } from '../product/product-controller';
import { diContainer } from '@framework/di';

export const handler: Handler = middyfy(async () => diContainer.resolve<ProductController>(ProductController).list());
