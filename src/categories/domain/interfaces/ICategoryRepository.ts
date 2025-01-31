import { Category } from "../entities/category";

export interface ICategoryRepository {
  findAll(userId: string): Promise<Category[]>;
  findById(id: string, userId: string): Promise<Category | null>;
  save(category: Category): Promise<Category[]>;
  update(
    id: string,
    userId: string,
    category: Partial<Category>
  ): Promise<void>;
  delete(id: string, userId: string): Promise<void>;
}
