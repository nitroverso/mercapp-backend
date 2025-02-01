import { Response } from "express";
import {
  listCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../application/services/categoryService";
import { buildController, parseResponse } from "../../../utils";
import { AuthenticatedRequest, STATUS_CODES } from "../../../types";

export const getCategories = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const callback = async () => {
    const userId = req.user!.id;
    const data = await listCategory(userId);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
  };
  buildController({ req, res, callback });
};

export const getCategory = async (req: AuthenticatedRequest, res: Response) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = await getCategoryById(id, userId);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    } else {
      res
        .status(STATUS_CODES.s404)
        .json(parseResponse({ code: STATUS_CODES.s404 }));
    }
  };
  buildController({ req, res, callback });
};

export const addCategory = async (req: AuthenticatedRequest, res: Response) => {
  const callback = async () => {
    const { name } = req.body;
    const userId = req.user!.id;
    const data = await createCategory(userId, name);
    if (data) {
      res
        .status(STATUS_CODES.s201)
        .json(parseResponse({ code: STATUS_CODES.s201, data }));
    }
  };
  buildController({ req, res, callback });
};

export const updateCategoryController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const categoryData = req.body;
    const data = await updateCategory(id, userId, categoryData);
    if (data) {
      res
        .status(STATUS_CODES.s200)
        .json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
  };
  buildController({ req, res, callback });
};

export const deleteCategoryController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = await deleteCategory(id, userId);
    if (data) {
      res.status(STATUS_CODES.s204).send();
    }
  };
  buildController({ req, res, callback });
};
