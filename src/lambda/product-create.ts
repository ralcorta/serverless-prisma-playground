import 'reflect-metadata';
import { middyfy } from '@framework/middify';
import { APIGatewayProxyEventParsed } from '../core/types';
import { APIGatewayProxyResult, Handler } from 'aws-lambda';
import { ProductController } from '../product/product-controller';
import { diContainer } from '@framework/di';

export const handler: Handler = middyfy(async (event: APIGatewayProxyEventParsed) => diContainer.resolve(ProductController).create(event));
