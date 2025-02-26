import supabase from "../../../config/supabase";
import { STATUS_CODES } from "../../../types";
import { userRepositoryImpl } from "../../infrastructure/repositories/userRepositoryImpl";

const userRepository = new userRepositoryImpl();

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  birthday: string
) => {
  const authUser = await userRepository.singUp(email, password);
  if (!authUser.user) {
    const authError = {
      status: STATUS_CODES.s404,
      message:
        "User not found when creating it (supabase.auth.signUp returns empty auth user)",
    };
    throw authError;
  }
  const user = await userRepository.save({
    id: authUser.user.id,
    firstName,
    lastName,
    birthday,
  });
  console.log("userServices", user);
  return user;
};

export const login = async (email: string, password: string) => {
  const userData = await userRepository.loginSupabase(email, password);
  return userData;
};

export const logout = async () => {
  const userLogout = await userRepository.logout();
  return userLogout;
};

export const deleteUser = async (userId: string) => {
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw error;
};
