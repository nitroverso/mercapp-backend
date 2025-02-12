import { Request } from "express";
import { Category } from "./categories/domain/entities/category";
import { Product } from "./products/domain/entities/product";
import { DomainEvent } from "./events/domain/entities/domainEvent";
import { User } from "./auth/domain/entities/user";

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
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
  };
}

/** ******* PROMISE VOID ANY CONTEXT ******* */
export type PromiseVoid = Promise<void>;
/** ******* END OF: PROMISE VOID ANY CONTEXT ******* */

/** ******* CATEGORY CONTEXT ******* */
export type CategoryResponse = Promise<Category>;
export type CategoryListResponse = Promise<Category[]>;
export type CategoryPartialResponse = Partial<Category>;
export type CategoryResponseOrNull = Promise<Category | null>;
/** ******* END OF: CATEGORY CONTEXT ******* */

/** ******* PRODUCT CONTEXT ******* */
export type ProductResponse = Promise<Product>;
export type ProductListResponse = Promise<Product[]>;
export type ProductPartialResponse = Partial<Product>;
export type ProductResponseOrNull = Promise<Product | null>;
/** ******* END OF: PRODUCT CONTEXT ******* */

/** ******* EVENT CONTEXT ******* */
export type EventResponse = Promise<DomainEvent>;
export type EventListResponse = Promise<DomainEvent[]>;
export type EventPartialResponse = Partial<DomainEvent>;
export type EventResponseOrNull = Promise<DomainEvent | null>;
/** ******* END OF: EVENT CONTEXT ******* */

/** ******* USER CONTEXT ******* */
export type UserResponse = Promise<User>;
export type UserResponseOrNull = Promise<User | null>;
/** ******* END OF: USER CONTEXT ******* */
