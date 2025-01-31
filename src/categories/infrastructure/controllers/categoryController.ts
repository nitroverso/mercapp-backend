import { Request, Response } from "express";
import {
  listCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../application/services/categoryService";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const getCategories = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const category = await listCategory(userId);
    res.json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "A ocurrido un problema" });
    }
  }
};

export const getCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const category = await getCategoryById(id, userId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "No se encontro el producto" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "A ocurrido un problema" });
    }
  }
};

export const addCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.body;

    const userId = req.user!.id;

    const nuevaCategory = await createCategory(userId, name);
    if (nuevaCategory)
      res
        .status(201)
        .json({
          nuevaCategory,
          message: "Categoria creada satisfactoriamente",
        });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ha ocurrido un problema" });
    }
  }
};

export const updateCategoryController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const categoryData = req.body;
    await updateCategory(id, userId, categoryData);
    res.json({ message: "Cateogria actualizada satisfactoriamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "A ocurrido un problema" });
    }
  }
};

export const deleteCategoryController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    await deleteCategory(id, userId);
    res.status(204).send();
    res.json({ message: "Categoria eliminada satisfactoriamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "A ocurrido un problema" });
    }
  }
};
