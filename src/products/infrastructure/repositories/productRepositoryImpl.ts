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
import { buildRepository } from "../../../utils/utils";

const TABLE_NAME = TABLES.PRODUCTS;

export class ProductRepositoryImpl implements IProductRepository {
  async findAll(userId: string): ProductListResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq(COLUMNS.USER_ID, userId);
    };
    return buildRepository<Product[]>({ supabaseCall });
  }

  async findById(id: string, userId: string): ProductResponseOrNull {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .single();
    };
    return buildRepository<Product | null>({ supabaseCall });
  }

  async save(product: Product): ProductResponse {
    const supabaseCall = async () => {
      return await supabase.from(TABLE_NAME).insert(product).select().single();
    };
    return buildRepository<Product>({ supabaseCall });
  }

  async update(
    id: string,
    userId: string,
    product: ProductPartialResponse
  ): ProductResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .update(product)
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .select("*")
        .single();
    };
    return buildRepository<Product>({ supabaseCall });
  }

  async delete(id: string, userId: string): ProductResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .delete()
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .select("*")
        .single();
    };
    return buildRepository<Product>({ supabaseCall });
  }
}
