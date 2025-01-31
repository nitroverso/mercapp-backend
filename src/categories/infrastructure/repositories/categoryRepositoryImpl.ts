import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";
import { Category } from "../../domain/entities/category";
import supabase from "../../../config/supabase";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";

export class categoryRepositoryImpl implements ICategoryRepository {
  async findAll(userId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select("*")
      .eq(COLUMNS.USER_ID, userId);

    if (error) throw new Error(error.message);
    return data as Category[];
  }

  async findById(id: string, userId: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select("*")
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId)
      .single();

    if (error) return null;
    return data as Category;
  }

  async save(category: Category): Promise<Category[]> {
    const { error } = await supabase.from(TABLES.CATEGORIES).insert([category]);

    if (error) throw new Error(error.message);
    return [category];
  }

  async update(
    id: string,
    userId: string,
    category: Partial<Category>
  ): Promise<void> {
    const { error } = await supabase
      .from(TABLES.CATEGORIES)
      .update(category)
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId);

    if (error) throw new Error(error.message);
  }

  async delete(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.CATEGORIES)
      .delete()
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId);

    if (error) throw new Error(error.message);
  }
}
