import { ProductRepositoryImpl } from "../../infrastructure/repositories/productRepositoryImpl";
import { Product } from "../../domain/entities/product";

const productRepository = new ProductRepositoryImpl();

export const listProducts = async (userId: string): Promise<Product[]> => {
  return await productRepository.findAll(userId);
};

export const getProductById = async (id: string, userId: string): Promise<Product | null> => {
  return await productRepository.findById(id, userId);
};

export const createProduct = async (user_id: string, name: string, category_id: string, unit_id: string, quantity: number): Promise<void> => {
  const product = new Product( user_id, name, category_id, unit_id, quantity);
  await productRepository.save(product);
};

export const updateProduct = async (id: string, userId: string, product: Partial<Product>): Promise<void> => {
  await productRepository.update(id, userId, product);
};

export const deleteProduct = async (id: string, userId: string): Promise<void> => {
  await productRepository.delete(id, userId);
};