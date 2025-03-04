import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";
import { Category } from "../../domain/entities/category";
import supabase from "../../../config/supabase";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";
import {
  CategoryListResponse,
  CategoryPartialResponse,
  CategoryResponse,
  CategoryResponseOrNull,
} from "../../../types";
import { buildRepository } from "../../../utils/utils";

const TABLE_NAME = TABLES.CATEGORIES;

export class categoryRepositoryImpl implements ICategoryRepository {
  async findAll(userId: string): CategoryListResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq(COLUMNS.USER_ID, userId);
    };
    return buildRepository<Category[]>({ supabaseCall });
  }

  async findById(id: string, userId: string): CategoryResponseOrNull {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .single();
    };
    return buildRepository<Category>({ supabaseCall });
  }
  async save(category: Category): CategoryResponse {
    const supabaseCall = async () => {
      return await supabase.from(TABLE_NAME).insert(category).select().single();
    };
    return buildRepository<Category>({ supabaseCall });
  }

  async update(
    id: string,
    userId: string,
    category: CategoryPartialResponse
  ): CategoryResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .update(category)
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .select("*")
        .single();
    };
    return buildRepository<Category>({ supabaseCall });
  }

  async delete(id: string, userId: string): CategoryResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .delete()
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .select("*")
        .single();
    };
    return buildRepository<Category>({ supabaseCall });
  }
}
