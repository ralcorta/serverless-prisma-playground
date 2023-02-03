import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';
import { container } from 'tsyringe';

container.register<PrismaClient>(PrismaClient, {
	useValue: (() => {
		console.log('PrismaClient instanciado');
		return new PrismaClient();
	})()
});

export const diContainer = container;
