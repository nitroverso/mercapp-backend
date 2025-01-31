import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/user";
import supabase from "../../../config/supabase";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";

export class UserRepositoryImpl implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select("*")
      .eq(COLUMNS.ID, id)
      .single();

    if (error) return null;
    return data as User;
  }

  async save(user: User): Promise<void> {
    const { error } = await supabase.from(TABLES.USERS).insert([user]);

    if (error) throw new Error(error.message);
  }
}
