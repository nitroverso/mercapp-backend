import { Request, Response } from "express";
import { register, login, logout } from "../../application/services/authService";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, age, gender } = req.body;

    if (!email || !password || !name || !age || !gender) {
      res.status(400).json({ error: "Todos los campos son requeridos" });
      return;
    }

    const result = await register(email, password, name, age, gender);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
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
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await logout();
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};