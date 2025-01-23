import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";
import { Category } from "../../domain/entities/category";
import supabase from "../../../config/supabase";

export class categoryRepositoryImpl implements ICategoryRepository {
  async findAll(userId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data as Category[];
  }

  async findById(id: string, userId: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return data as Category;
  }

  async save(category: Category): Promise<void> {
    const { error } = await supabase
      .from("categories")
      .insert([category]);

    if (error) throw new Error(error.message);
  }

  async update(id: string, userId: string, category: Partial<Category>): Promise<void> {
    const { error } = await supabase
      .from("categories")
      .update(category)
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }

  async delete(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }
}