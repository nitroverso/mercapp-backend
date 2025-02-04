import { categoryRepositoryImpl } from "../../infrastructure/repositories/categoryRepositoryImpl";
import { Category } from "../../domain/entities/category";
import {
  CategoryListResponse,
  CategoryPartialResponse,
  CategoryResponse,
  CategoryResponseOrNull,
} from "../../../types";

const categoryRepository = new categoryRepositoryImpl();

export const listCategory = async (userId: string): CategoryListResponse => {
  return await categoryRepository.findAll(userId);
};

export const getCategoryById = async (
  id: string,
  userId: string
): CategoryResponseOrNull => {
  return await categoryRepository.findById(id, userId);
};

export const createCategory = async (
  userId: string,
  name: string
): CategoryResponse => {
  const category = new Category(name, userId);
  return await categoryRepository.save(category);
};

export const updateCategory = async (
  id: string,
  userId: string,
  category: CategoryPartialResponse
): CategoryResponse => {
  return await categoryRepository.update(id, userId, category);
};

export const deleteCategory = async (
  id: string,
  userId: string
): CategoryResponse => {
  return await categoryRepository.delete(id, userId);
};
