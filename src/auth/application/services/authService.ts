import supabase from "../../../config/supabase";

export const register = async ( email:string, password: string, firstName: string, lastName: string, birthday: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  const user_id = data.user?.id;
  const user = { id: user_id, firstName, lastName, birthday };

  const { error: insertError } = await supabase.from("users").insert([user]);

  if (insertError) throw new Error(insertError.message);

  return { message: "Usuario registrado con éxito", data: user, user: data.user };
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return { message: "Inicio de sesión exitoso", user: data.user, jwt: data.session.access_token };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  return { message: "Sesión cerrada exitosamente" };
};

export const deleteUser = async (userId: string) => {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw new Error(error.message);

  return { message: "Usuario eliminado exitosamente" };
};