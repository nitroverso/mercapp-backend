import { Request } from "express";
import { Category } from "./categories/domain/entities/category";
import { Product } from "./products/domain/entities/product";
import { DomainEvent } from "./events/domain/entities/domainEvent";
import { User } from "./auth/domain/entities/user";
import { Unit } from "./units/domain/entities/unit";
import { AuthError, AuthUser, PostgrestError } from "@supabase/supabase-js";

export enum STATUS_CODES {
  s200 = 200,
  s201 = 201,
  s204 = 204,
  s400 = 400,
  s401 = 401,
  s403 = 403,
  s404 = 404,
  s405 = 405,
  s409 = 409,
  s415 = 415,
  s416 = 416,
  s500 = 500,
  s503 = 503,
  s504 = 504,
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
export type AuthUserResponse = Promise<User>;
export type AuthUserResponseOrNull = Promise<User | null>;
/** ******* END OF: USER CONTEXT ******* */

/** ******* UNIT CONTEXT ******* */
export type UnitListResponse = Promise<Unit[] | null>;
/** ******* END OF: UNIT CONTEXT ******* */

/** ******* SUPABASE RESPONSE CONTEXT ******* */
export type SupabaseUserAuthResponse = Promise<{ user: AuthUser | null }>;
export type SupabaseUserAuthResponseError = Promise<{
  error: AuthError | null;
}>;
/** ******* SUPABASE RESPONSE CONTEXT ******* */

export const SUPABASE_ERROR_MAP: Record<
  string,
  { code: STATUS_CODES; message: string }
> = {
  // Mapeo de errores de Supabase
  PGRST000: {
    code: STATUS_CODES.s500,
    message:
      "No pudimos conectarnos al sistema. Por favor, inténtalo de nuevo más tarde.",
  },
  PGRST001: {
    code: STATUS_CODES.s500,
    message:
      "Ocurrió un error interno al conectar con el servidor. Intenta más tarde.",
  },
  PGRST002: {
    code: STATUS_CODES.s500,
    message:
      "No es posible cargar los datos en este momento. Por favor, inténtalo más tarde.",
  },
  PGRST003: {
    code: STATUS_CODES.s504,
    message:
      "Tu solicitud está tardando demasiado. Intenta nuevamente en unos momentos.",
  },
  PGRST100: {
    code: STATUS_CODES.s400,
    message:
      "Parece que hubo un error en tu solicitud. Por favor, revisa los datos enviados.",
  },
  PGRST101: {
    code: STATUS_CODES.s405,
    message:
      "La acción que estás intentando no está permitida. Verifica el método utilizado.",
  },
  PGRST102: {
    code: STATUS_CODES.s400,
    message:
      "El formato de los datos enviados no es válido. Corrígelo e intenta nuevamente.",
  },
  PGRST103: {
    code: STATUS_CODES.s416,
    message:
      "El rango solicitado no es válido. Por favor, ajusta los parámetros e intenta de nuevo.",
  },
  PGRST105: {
    code: STATUS_CODES.s400,
    message:
      "Hubo un problema con la actualización. Verifica los datos enviados.",
  },
  PGRST106: {
    code: STATUS_CODES.s400,
    message:
      "El esquema solicitado no está disponible. Intenta con otro recurso.",
  },
  PGRST107: {
    code: STATUS_CODES.s415,
    message:
      "El formato del contenido enviado no es compatible. Revisa el tipo de datos enviados.",
  },
  PGRST108: {
    code: STATUS_CODES.s400,
    message:
      "Faltan datos en tu solicitud. Por favor, verifica la información enviada.",
  },
  PGRST109: {
    code: STATUS_CODES.s400,
    message:
      "La eliminación no puede realizarse con el rango establecido. Ajusta los parámetros.",
  },
  PGRST110: {
    code: STATUS_CODES.s409,
    message:
      "La operación podría afectar más registros de los permitidos. Por favor, revisa los criterios.",
  },
  PGRST111: {
    code: STATUS_CODES.s400,
    message:
      "Hubo un error al configurar los encabezados de la respuesta. Intenta nuevamente.",
  },
  PGRST112: {
    code: STATUS_CODES.s400,
    message:
      "El código de estado enviado es inválido. Comunícate con soporte si persiste.",
  },
  PGRST113: {
    code: STATUS_CODES.s500,
    message: "Ocurrió un error al obtener la información. Intenta más tarde.",
  },
  PGRST116: {
    code: STATUS_CODES.s404,
    message:
      "No se encontró la información solicitada. Verifica los datos ingresados.",
  },
  PGRST117: {
    code: STATUS_CODES.s405,
    message:
      "El método utilizado no está permitido para esta operación. Verifica la documentación.",
  },
  PGRST200: {
    code: STATUS_CODES.s400,
    message:
      "El recurso solicitado no existe o no está disponible actualmente.",
  },
  PGRST201: {
    code: STATUS_CODES.s409,
    message: "Existen ambigüedades en tu solicitud. Por favor, revísala.",
  },
  PGRST202: {
    code: STATUS_CODES.s404,
    message:
      "La función solicitada no está disponible. Contacta al soporte si persiste.",
  },
  PGRST203: {
    code: STATUS_CODES.s400,
    message:
      "El recurso solicitado no existe o no está disponible actualmente.",
  },
  PGRST204: {
    code: STATUS_CODES.s404,
    message:
      "La columna especificada no existe. Por favor, revisa los parámetros.",
  },
  PGRST300: {
    code: STATUS_CODES.s401,
    message:
      "Falta información de autenticación. Por favor, inicia sesión nuevamente.",
  },
  PGRST301: {
    code: STATUS_CODES.s401,
    message: "Tu sesión no es válida. Por favor, vuelve a iniciar sesión.",
  },
  PGRST302: {
    code: STATUS_CODES.s403,
    message:
      "No tienes permiso para realizar esta acción. Comunícate con el soporte si crees que es un error.",
  },
  "42P01": {
    code: STATUS_CODES.s404,
    message: "El recurso solicitado no existe en el sistema.",
  },
  "42501": {
    code: STATUS_CODES.s403,
    message: "No tienes los permisos necesarios para realizar esta acción.",
  },
  "23503": {
    code: STATUS_CODES.s409,
    message:
      "La operación no puede completarse porque viola una restricción de datos.",
  },
  "23502": {
    code: STATUS_CODES.s409,
    message:
      "La operación no puede completarse porque viola una restricción de datos.",
  },
  "23505": {
    code: STATUS_CODES.s409,
    message:
      "El dato que intentas ingresar ya existe. Por favor, intenta con otro.",
  },
  "22P02": {
    code: STATUS_CODES.s400,
    message:
      "Los datos enviados no tienen el formato esperado. Verifica e inténtalo de nuevo.",
  },
  "22001": {
    code: STATUS_CODES.s400,
    message:
      "El valor enviado excede la longitud máxima permitida. Reduce el tamaño e inténtalo nuevamente.",
  },
  "22007": {
    code: STATUS_CODES.s400,
    message:
      "El formato de fecha u hora enviado no es válido. Por favor, verifica el valor.",
  },
  "22003": {
    code: STATUS_CODES.s400,
    message:
      "El número enviado es demasiado grande o pequeño para el campo definido.",
  },

  "28P01": {
    code: STATUS_CODES.s401,
    message:
      "Las credenciales proporcionadas no son correctas. Intenta nuevamente.",
  },

  "23514": {
    code: STATUS_CODES.s400,
    message:
      "El valor enviado no cumple con las restricciones definidas en la base de datos. Revisa e inténtalo nuevamente.",
  },

  "40001": {
    code: STATUS_CODES.s409,
    message:
      "Hubo un conflicto al intentar realizar esta acción. Por favor, inténtalo de nuevo.",
  },
  "40P01": {
    code: STATUS_CODES.s500,
    message:
      "Se detectó un bloqueo en la base de datos. Inténtalo de nuevo más tarde.",
  },

  "42703": {
    code: STATUS_CODES.s400,
    message:
      "Uno de los campos enviados no es válido o no existe. Por favor, revisa los datos.",
  },
  "42601": {
    code: STATUS_CODES.s400,
    message:
      "Hay un error en la sintaxis de la consulta. Por favor, contacta al soporte técnico.",
  },
  "53300": {
    code: STATUS_CODES.s503,
    message:
      "La base de datos está en su capacidad máxima. Por favor, inténtalo más tarde.",
  },
  "55000": {
    code: STATUS_CODES.s500,
    message: "Se encontró un error inesperado. Intenta nuevamente más tarde.",
  },

  "42701": {
    code: STATUS_CODES.s400,
    message:
      "El nombre del campo que intentas usar ya existe. Por favor, revisa los datos enviados.",
  },
  AuthInvalidEmail: {
    code: STATUS_CODES.s400,
    message:
      "El correo ingresado no es válido. Por favor, corrígelo e intenta nuevamente.",
  },
  AuthInvalidPassword: {
    code: STATUS_CODES.s400,
    message:
      "La contraseña no cumple con los requisitos mínimos. Intenta con otra.",
  },
  AuthSessionExpired: {
    code: STATUS_CODES.s401,
    message: "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.",
  },
  AuthTokenInvalid: {
    code: STATUS_CODES.s401,
    message:
      "El token de autenticación no es válido. Por favor, vuelve a iniciar sesión.",
  },
  AuthUnauthorized: {
    code: STATUS_CODES.s403,
    message:
      "No tienes permiso para realizar esta acción. Intenta con otra cuenta o verifica tus permisos.",
  },
};

export const SUPABASE_ERROR_NO_CODE_ONLY_MESSAGE: Record<
  string,
  {
    codeStatus: STATUS_CODES;
    message: string;
    details?: PostgrestError["details"];
  }
> = {
  // Mapeo de errores de Supabase que no poseen un código de error solo mensaje
  "Invalid login credentials": {
    codeStatus: STATUS_CODES.s401,
    message: "Credenciales inválidas. Verifique las claves de Supabase.",
    details: "",
  },
};
