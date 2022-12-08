import { ProductController } from "../product/product.controller.js";
import { middyfy } from "../utils/middify.js";

const productController = new ProductController();

export const list = middyfy(productController.list);
export const create = middyfy(productController.create);
