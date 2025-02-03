import { Request, Response } from "express";
import { AuthenticatedRequest, STATUS_CODES } from "./types";

type ParseResponseParams = {
  data?: any;
  code: STATUS_CODES;
  message?: string;
};

export const parseResponse = ({ data, code, message }: ParseResponseParams) => {
  switch (code) {
    case STATUS_CODES.s200:
    case STATUS_CODES.s201:
    case STATUS_CODES.s204:
      return { data, message: message ?? "Success!" };

    case STATUS_CODES.s400:
      return { message: message ?? "Please check the request!" };

    case STATUS_CODES.s401:
      return { message: message ?? "Unauthorized, token required!" };

    case STATUS_CODES.s404:
      return { message: message ?? "Resource not found!" };

    case STATUS_CODES.s500:
      return { message: message ?? "Internal unknown error has occurred!" };
  }
};

type BuildControllerParams = {
  req: AuthenticatedRequest | Request;
  res: Response;
  callback: () => Promise<void>;
};

export const buildController = async ({
  req,
  res,
  callback,
}: BuildControllerParams) => {
  try {
    await callback();
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    res
      .status(STATUS_CODES.s500)
      .json(parseResponse({ code: STATUS_CODES.s500, message }));
  }
};
