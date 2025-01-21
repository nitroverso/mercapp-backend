import { Product } from "../entities/product";

export interface IProductRepository {
  findAll(userId: string): Promise<Product[]>;
  findById(id: string, userId: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  update(id: string, userId: string, product: Partial<Product>): Promise<void>;
  delete(id: string, userId: string): Promise<void>;
}