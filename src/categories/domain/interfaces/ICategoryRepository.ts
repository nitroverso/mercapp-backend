import { CategoryListResponse, CategoryResponse } from "../../../types";
import { Category } from "../entities/category";

export interface ICategoryRepository {
  findAll(userId: string): CategoryListResponse;
  findById(id: string, userId: string): Promise<Category | null>;
  save(category: Category): CategoryResponse;
  update(
    id: string,
    userId: string,
    category: Partial<Category>
  ): CategoryResponse;
  delete(id: string, userId: string): CategoryResponse;
}
