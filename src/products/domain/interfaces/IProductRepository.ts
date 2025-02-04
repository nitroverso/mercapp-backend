import {
  ProductListResponse,
  ProductPartialResponse,
  ProductResponse,
  ProductResponseOrNull,
} from "../../../types";
import { Product } from "../entities/product";

export interface IProductRepository {
  findAll(userId: string): ProductListResponse;
  findById(id: string, userId: string): ProductResponseOrNull;
  save(product: Product): ProductResponse;
  update(
    id: string,
    userId: string,
    product: ProductPartialResponse
  ): ProductResponse;
  delete(id: string, userId: string): ProductResponse;
}
