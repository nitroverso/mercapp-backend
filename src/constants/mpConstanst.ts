// constants for repositories and services

export const TABLES = {
  EVENTS: "events",
  USERS: "users",
  PRODUCTS: "products",
  CATEGORIES: "categories",
  SHOPPY_LIST: "shoppy_list",
};

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

export const ROUTES_LOGIN = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  DELETE: "/delete/:userId",
};

export const ROUTES_CATEGORIES = {
  GET_CATEGORY: "/",
  GET_CATEGORY_ID: "/:id",
  POST_CATEGORY: "/",
  PUT_CATEGORY: "/:id",
  DELETE_CATEGORY: "/:id",
};
