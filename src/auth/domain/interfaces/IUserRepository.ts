import { PromiseVoid, UserResponseOrNull } from "../../../types";
import { User } from "../entities/user";

export interface IUserRepository {
  findById(id: string): UserResponseOrNull;
  save(user: User): PromiseVoid;
}
