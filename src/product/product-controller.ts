import { ProductService } from './product-service';
import { inject, singleton } from 'tsyringe';
import { APIGatewayProxyEventParsed } from '../core/types';
import { Product } from '@prisma/client';

@singleton()
export class ProductController {
	constructor(@inject(ProductService) private productService: ProductService) {}

	async create(event: APIGatewayProxyEventParsed<Record<string, any>>) {
		return this.productService.create(event.body.title, event.body.contnet);
	}

	async list(): Promise<Product[]> {
		return this.productService.list();
	}

	async delete(event: APIGatewayProxyEventParsed<Record<string, any>>) {
		this.productService.delete(event.body.id);
	}
}
