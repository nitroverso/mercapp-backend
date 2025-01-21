import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { Product } from "../../domain/entities/product";
import supabase from "../../../config/supabase";

export class ProductRepositoryImpl implements IProductRepository {
  async findAll(userId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data as Product[];
  }

  async findById(id: string, userId: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return data as Product;
  }

  async save(product: Product): Promise<void> {
    const { error } = await supabase
      .from("products")
      .insert([product]);

    if (error) throw new Error(error.message);
  }

  async update(id: string, userId: string, product: Partial<Product>): Promise<void> {
    const { error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }

  async delete(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }
}