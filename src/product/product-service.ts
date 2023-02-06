import { PrismaClient, Product } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProductService {
	constructor(@inject(PrismaClient) private prisma: PrismaClient) {}

	async create(title: string, content: string) {
		return await this.prisma.product.create({
			data: {
				title,
				content
			}
		});
	}

	async list(): Promise<Product[]> {
		return this.prisma.product.findMany();
	}

	async delete(id: number) {
		return this.prisma.product.delete({
			where: {
				id
			}
		});
	}
}
