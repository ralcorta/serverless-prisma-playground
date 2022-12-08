import {
  APIGatewayProxyEventParsed,
  Controller,
} from "./../utils/controller.js";
import { Response } from "../utils/response.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductController implements Controller<ProductController> {
  async list() {
    try {
      const posts = await prisma.product.findMany();
      return Response.ok(posts);
    } catch (error) {
      return Response.serverError(error?.message);
    }
  }

  async create(event: APIGatewayProxyEventParsed) {
    try {
      const newProduct = await prisma.product.create({
        data: {
          title: event.body.title,
          content: event.body.content,
        },
      });
      return Response.ok(newProduct);
    } catch (error) {
      return Response.serverError(error?.message);
    }
  }
}
