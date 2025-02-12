import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { Product } from "../../domain/entities/product";
import supabase from "../../../config/supabase";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";
import {
  ProductListResponse,
  ProductPartialResponse,
  ProductResponse,
  ProductResponseOrNull,
} from "../../../types";

export class ProductRepositoryImpl implements IProductRepository {
  async findAll(userId: string): ProductListResponse {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select("*")
      .eq(COLUMNS.USER_ID, userId);

    if (error) throw new Error(error.message);
    return data as Product[];
  }

  async findById(id: string, userId: string): ProductResponseOrNull {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select("*")
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId)
      .single();

    if (error) return null;
    return data as Product;
  }

  async save(product: Product): ProductResponse {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .insert(product)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as Product;
  }

  async update(
    id: string,
    userId: string,
    product: ProductPartialResponse
  ): ProductResponse {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .update(product)
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId)
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    return data as Product;
  }

  async delete(id: string, userId: string): ProductResponse {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .delete()
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data as Product;
  }
}
