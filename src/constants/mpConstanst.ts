// constants for repositories and services

/** ******* TABLES CONTEXT ******* */
export const TABLES = {
  AUTH: "auth.users",
  EVENTS: "events",
  USERS: "users",
  PRODUCTS: "products",
  CATEGORIES: "categories",
  SHOPPY_LIST: "shoppy_list",
  UNITS: "units",
};
/** ******* END OF: TABLES CONTEXT ******* */

/** ******* COLUMNS CONTEXT ******* */
export const COLUMNS = {
  ID: "id",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  PASSWORD: "password",
  BIRTHDAY: "birthday",
  USER_ID: "user_id",
  NAME: "name",
  DESCRIPTION: "description",
  CATEGORY_ID: "category_id",
  PRICE: "price",
  QUANTITY: "quantity",
};
/** ******* END OF: COLUMNS CONTEXT ******* */

/** ******* ROUTES_LOGIN CONTEXT ******* */
export const ROUTES_LOGIN = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  DELETE: "/delete/:userId",
};
/** ******* END OF: ROUTES_LOGIN CONTEXT ******* */

/** ******* ROUTES_CATEGORIES CONTEXT ******* */
export const ROUTES_CATEGORIES = {
  GET_CATEGORY: "/",
  GET_CATEGORY_ID: "/:id",
  POST_CATEGORY: "/",
  PUT_CATEGORY: "/:id",
  DELETE_CATEGORY: "/:id",
};
/** ******* END OF: ROUTES_CATEGORIES CONTEXT ******* */

/** ******* ROUTES_UNIT CONTEXT ******* */
export const ROUTES_UNIT = {
  GET_UNIT: "/",
};
/** ******* END OF: ROUTES_UNIT CONTEXT ******* */

/** ******* LOG LEVEL ******* */

export const LogLevel = {
  Info: "Info",
  Warn: "Warn",
  Error: "Error",
  NoError: "No Error",
};
/** ******* END OF: LOG LEVEL ******* */
