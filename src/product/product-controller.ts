import { inject, singleton } from 'tsyringe';
import { APIGatewayProxyEventParsed } from '../core/types';
import { PrismaClient, Product } from '@prisma/client';

@singleton()
export class ProductController {
	constructor(@inject(PrismaClient) private prisma: PrismaClient) {}

	async create(event: APIGatewayProxyEventParsed) {
		return await this.prisma.product.create({
			data: {
				title: event.body.title,
				content: event.body.content
			}
		});
	}

	async list(): Promise<Product[]> {
		return this.prisma.product.findMany();
	}
}
