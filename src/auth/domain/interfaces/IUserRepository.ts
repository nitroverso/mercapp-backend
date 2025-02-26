import { AuthError, AuthUser } from "@supabase/supabase-js";
import { UserResponse } from "../../../types";
import { User } from "../entities/user";

export interface IUserRepository {
  singUp(email: string, password: string): Promise<{ user: AuthUser | null }>;
  loginSupabase(
    email: string,
    password: string
  ): Promise<{ user: AuthUser | null }>;
  logout(): Promise<{ error: AuthError | null }>;
  save(user: User): UserResponse;
  findById(userId: string): UserResponse;
}
