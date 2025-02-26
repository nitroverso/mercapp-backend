import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/user";
import supabase from "../../../config/supabase";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";
import { buildRepository } from "../../../utils/utils";
import { UserResponse } from "../../../types";
import { AuthError, User as AuthUser } from "@supabase/supabase-js";

export class userRepositoryImpl implements IUserRepository {
  async singUp(
    email: string,
    password: string
  ): Promise<{ user: AuthUser | null }> {
    const supabaseCall = async () => {
      return await supabase.auth.signUp({ email, password });
    };
    return buildRepository<{ user: AuthUser | null }>({ supabaseCall });
  }

  async loginSupabase(
    email: string,
    password: string
  ): Promise<{ user: AuthUser | null }> {
    const supabaseCall = async () => {
      return await supabase.auth.signInWithPassword({ email, password });
    };
    return buildRepository<{ user: AuthUser | null }>({ supabaseCall });
  }

  async logout(): Promise<{ error: AuthError | null }> {
    const supabaseCall = async () => {
      return await supabase.auth.signOut();
    };
    return buildRepository<{ error: AuthError | null }>({ supabaseCall });
  }

  async delete(): Promise<{ error: AuthError | null }> {
    const supabaseCall = async () => {
      return await supabase.auth.signOut();
    };
    return buildRepository<{ error: AuthError | null }>({ supabaseCall });
  }

  async save(user: User): UserResponse {
    const supabaseCall = async () => {
      return await supabase.from(TABLES.USERS).insert([user]).select().single();
    };
    return buildRepository<User>({ supabaseCall });
  }

  async findById(userId: string): UserResponse {
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
