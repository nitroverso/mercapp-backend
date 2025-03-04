import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/user";
import supabase from "../../../config/supabase";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";
import { buildRepository } from "../../../utils/utils";
import {
  AuthUserResponse,
  SupabaseUserAuthResponse,
  SupabaseUserAuthResponseError,
} from "../../../types";

export class userRepositoryImpl implements IUserRepository {
  async singUp(email: string, password: string): SupabaseUserAuthResponse {
    const supabaseCall = async () => {
      return await supabase.auth.signUp({ email, password });
    };
    return buildRepository<SupabaseUserAuthResponse>({ supabaseCall });
  }

  async loginSupabase(
    email: string,
    password: string
  ): SupabaseUserAuthResponse {
    const supabaseCall = async () => {
      return await supabase.auth.signInWithPassword({ email, password });
    };
    return buildRepository<SupabaseUserAuthResponse>({ supabaseCall });
  }

  async logout(): SupabaseUserAuthResponseError {
    const supabaseCall = async () => {
      return await supabase.auth.signOut();
    };
    return buildRepository<SupabaseUserAuthResponseError>({ supabaseCall });
  }

  async delete(): SupabaseUserAuthResponseError {
    const supabaseCall = async () => {
      return await supabase.auth.signOut();
    };
    return buildRepository<SupabaseUserAuthResponseError>({ supabaseCall });
  }

  async save(user: User): AuthUserResponse {
    const supabaseCall = async () => {
      return await supabase.from(TABLES.USERS).insert([user]).select().single();
    };
    return buildRepository<User>({ supabaseCall });
  }

  async findById(userId: string): AuthUserResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLES.USERS)
        .select("*")
        .eq(COLUMNS.ID, userId)
        .single();
    };
    return buildRepository<User>({ supabaseCall });
  }
}
