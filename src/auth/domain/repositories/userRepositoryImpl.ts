import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/user";
import supabase from "../../../config/supabase";

export class UserRepositoryImpl implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as User;
  }

  async save(user: User): Promise<void> {
    const { error } = await supabase
      .from("users")
      .insert([user]);

    if (error) throw new Error(error.message);
  }
}