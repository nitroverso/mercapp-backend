import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import supabase from "../../../config/supabase";
import dotenv from "dotenv";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";
import {
  AuthenticatedRequest,
  PromiseVoid,
  STATUS_CODES,
} from "../../../types";
import { parseResponse } from "../../../utils/utils";

dotenv.config();

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): PromiseVoid => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res
      .status(STATUS_CODES.s401)
      .json(parseResponse({ code: STATUS_CODES.s401 }));
    return;
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    const user_id = verified.sub as string;

    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .select("id, firstName, birthday, lastName")
      .eq(COLUMNS.ID, user_id)
      .single();

    if (error || !user) {
      res
        .status(STATUS_CODES.s404)
        .json(parseResponse({ code: STATUS_CODES.s404 }));
      return;
    }

    req.user = {
      id: user.id,
      email: verified.email as string,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
    };

    next();
  } catch (error) {
    res
      .status(STATUS_CODES.s400)
      .json(parseResponse({ code: STATUS_CODES.s400 }));
  }
};
