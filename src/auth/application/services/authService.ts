import supabase from "../../../config/supabase";


export const register = async (email: string, password: string, name: string, age: number, gender: string) => {
 
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  const user_id = data.user?.id;

  if (!user_id) throw new Error("No se pudo obtener el ID del usuario");

  const user = { id: user_id, name, age, gender };
  const { error: insertError } = await supabase.from("users").insert([user]);

  if (insertError) throw new Error(insertError.message);

  return { message: "Usuario registrado con éxito" };
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return { message: "Inicio de sesión exitoso", user: data.user, data: data.session.access_token };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  return { message: "Sesión cerrada exitosamente" };
};
