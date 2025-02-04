import { ProductRepositoryImpl } from "../../infrastructure/repositories/productRepositoryImpl";
import { Product } from "../../domain/entities/product";
import {
  ProductListResponse,
  ProductPartialResponse,
  ProductResponse,
  ProductResponseOrNull,
} from "../../../types";

const productRepository = new ProductRepositoryImpl();

export const listProducts = async (userId: string): ProductListResponse => {
  return await productRepository.findAll(userId);
};

export const getProductById = async (
  id: string,
  userId: string
): ProductResponseOrNull => {
  return await productRepository.findById(id, userId);
};

export const createProduct = async (
  user_id: string,
  name: string,
  category_id: string,
  unit_id: string,
  quantity: number
): ProductResponse => {
  const product = new Product(user_id, name, category_id, unit_id, quantity);
  return await productRepository.save(product);
};

export const updateProduct = async (
  id: string,
  userId: string,
  product: ProductPartialResponse
): ProductResponse => {
  return await productRepository.update(id, userId, product);
};

export const deleteProduct = async (
  id: string,
  userId: string
): ProductResponse => {
  return await productRepository.delete(id, userId);
};
