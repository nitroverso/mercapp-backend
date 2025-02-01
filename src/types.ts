import { Request } from "express";
import { Category } from "./categories/domain/entities/category";

export enum STATUS_CODES {
  s200 = 200,
  s201 = 201,
  s204 = 204,
  s400 = 400,
  s401 = 401,
  s404 = 404,
  s500 = 500,
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

/** ******* CATEGORY CONTEXT ******* */
export type CategoryResponse = Promise<Category>;
export type CategoryListResponse = Promise<Category[]>;
/** ******* END OF: CATEGORY CONTEXT ******* */
