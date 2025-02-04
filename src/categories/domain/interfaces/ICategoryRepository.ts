import {
  CategoryListResponse,
  CategoryPartialResponse,
  CategoryResponse,
  CategoryResponseOrNull,
} from "../../../types";
import { Category } from "../entities/category";

export interface ICategoryRepository {
  findAll(userId: string): CategoryListResponse;
  findById(id: string, userId: string): CategoryResponseOrNull;
  save(category: Category): CategoryResponse;
  update(
    id: string,
    userId: string,
    category: CategoryPartialResponse
  ): CategoryResponse;
  delete(id: string, userId: string): CategoryResponse;
}
