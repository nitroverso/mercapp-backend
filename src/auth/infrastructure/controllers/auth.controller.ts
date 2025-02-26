import { Request, Response } from "express";
import {
  register,
  login,
  logout,
  deleteUser,
} from "../../application/services/authService";
import { PromiseVoid, STATUS_CODES } from "../../../types";
import { buildController, parseResponse } from "../../../utils/utils";

export const loginUser = async (req: Request, res: Response): PromiseVoid => {
  const callback = async () => {
    const { email, password } = req.body;
    const data = await login(email, password);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
  };
  buildController({ req, res, callback });
};

export const registerUser = async (
  req: Request,
  res: Response
): PromiseVoid => {
  const callback = async () => {
    const { email, password, firstName, lastName, birthday } = req.body;
    if (!firstName || !lastName || !birthday) {
      const error = parseResponse({
        code: STATUS_CODES.s400,
        message:
          "Bad request: firstName, lastName and birthday are required fields",
      });
      throw error;
    }
    const data = await register(email, password, firstName, lastName, birthday);
    console.log(data);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
  };
  buildController({ req, res, callback });
};

export const logoutUser = async (req: Request, res: Response): PromiseVoid => {
  const callback = async () => {
    const data = await logout();
    res.json(parseResponse({ code: STATUS_CODES.s200, data }));
  };
  buildController({ req, res, callback });
};

export const deleteUserController = async (
  req: Request,
  res: Response
): PromiseVoid => {
  const callback = async () => {
    const { userId } = req.params;
    await deleteUser(userId);
    res.json(parseResponse({ code: STATUS_CODES.s200 }));
  };
  buildController({ req, res, callback });
};
