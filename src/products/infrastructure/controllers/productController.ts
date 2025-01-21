import { Request, Response } from "express";
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../../application/services/productService";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id; 
    const products = await listProducts(userId);
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "A ocurrido un problema" });
    }
  }
};

export const getProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id; 
    const product = await getProductById(id, userId);
    if (product) {
      res.json(product);
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

export const addProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, category_id, unit_id, quantity } = req.body;

    const userId = req.user!.id;

    await createProduct(userId, name, category_id, unit_id, quantity);

    res.status(201).json({ message: "Producto creado satisfactoriamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ha ocurrido un problema" });
    }
  }
};


export const updateProductController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id; 
    const productData = req.body;
    await updateProduct(id, userId, productData);
    res.json({ message: "Producto actualizado satisfactoriamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "A ocurrido un problema" });
    }
  }
};

export const deleteProductController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id; 
    await deleteProduct(id, userId);
    res.status(204).send();
    res.json({ message: "Producto eliminado satisfactoriamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "A ocurrido un problema" });
    }
  }
};