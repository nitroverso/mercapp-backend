import {
  AuthUserResponse,
  SupabaseUserAuthResponse,
  SupabaseUserAuthResponseError,
} from "../../../types";
import { User } from "../entities/user";

export interface IUserRepository {
  singUp(email: string, password: string): SupabaseUserAuthResponse;
  loginSupabase(email: string, password: string): SupabaseUserAuthResponse;
  logout(): SupabaseUserAuthResponseError;
  save(user: User): AuthUserResponse;
  findById(userId: string): AuthUserResponse;
}
