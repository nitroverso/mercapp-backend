import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import supabase from "../../../config/supabase";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    age: number;
    gender: string;
  };
}

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Acceso denegado, token requerido" });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const user_id = verified.sub as string;

    const { data: user, error } = await supabase
      .from("users")
      .select("id, name, age, gender")
      .eq("id", user_id)
      .single();

    if (error || !user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    req.user = {
      id: user.id,
      email: verified.email as string,
      name: user.name,
      age: user.age,
      gender: user.gender,
    };

    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};