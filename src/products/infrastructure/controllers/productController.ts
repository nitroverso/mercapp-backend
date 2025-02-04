import { Response } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../application/services/productService";
import { buildController, parseResponse } from "../../../utils";
import { AuthenticatedRequest, STATUS_CODES } from "../../../types";

export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  const callback = async () => {
    const userId = req.user!.id;
    const data = await listProducts(userId);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
  };
  buildController({ req, res, callback });
};

export const getProduct = async (req: AuthenticatedRequest, res: Response) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = await getProductById(id, userId);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
    buildController({ req, res, callback });
  };
};

export const addProduct = async (req: AuthenticatedRequest, res: Response) => {
  const callback = async () => {
    const { name, category_id, unit_id, quantity } = req.body;
    const userId = req.user!.id;
    const data = await createProduct(
      userId,
      name,
      category_id,
      unit_id,
      quantity
    );
    if (data) {
      res
        .status(STATUS_CODES.s201)
        .json(parseResponse({ code: STATUS_CODES.s201, data }));
    }
  };
  buildController({ req, res, callback });
};

export const updateProductController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const productData = req.body;
    const data = await updateProduct(id, userId, productData);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
    buildController({ req, res, callback });
  };
};

export const deleteProductController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = await deleteProduct(id, userId);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s204 }));
    }
    buildController({ req, res, callback });
  };
};
