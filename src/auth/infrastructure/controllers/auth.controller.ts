import { Request, Response } from "express";
import {
  register,
  login,
  logout,
  deleteUser,
} from "../../application/services/authService";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, birthday } = req.body;

    if (!email || !password || !firstName || !lastName || !birthday) {
      res.status(400).json({ error: "Todos los campos son requeridos" });
      return;
    }

    const result = await register(
      email,
      password,
      firstName,
      lastName,
      birthday
    );
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "A ocurrido un error" });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "A ocurrido un error" });
    }
  }
};

export const logoutUser = async (res: Response): Promise<void> => {
  try {
    const result = await logout();
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "A ocurrido un error" });
    }
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const result = await deleteUser(userId);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "A ocurrido un error" });
    }
  }
};
