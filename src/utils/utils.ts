import { Request, Response } from "express";
import { AuthenticatedRequest, PromiseVoid, STATUS_CODES } from "../types";
import {
  AuthError,
  AuthResponse,
  PostgrestError,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";

const handleError = (
  error: AuthError | (PostgrestError & { status: number })
): { codeStatus: number; message: string } => {
  if (!error) {
    return {
      codeStatus: STATUS_CODES.s500,
      message: "Unknown error",
    };
  }
  return {
    codeStatus: error.status ?? STATUS_CODES.s500,
    message: error.message ?? "Internal server error",
  };
};

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
      return { data, message: message ?? "Success!", status: code };

    default:
      return {
        data: null,
        message: message ?? "Internal server error",
        status: code,
      };
  }
};

type BuildControllerParams = {
  req: AuthenticatedRequest | Request;
  res: Response;
  callback: () => PromiseVoid;
};

export const buildController = async ({
  req,
  res,
  callback,
}: BuildControllerParams) => {
  try {
    await callback();
  } catch (error) {
    const mappedError = handleError(error as AuthError);
    res.status(mappedError.codeStatus).json(mappedError);
  }
};

type BuildRepositoryParams = {
  supabaseCall: () => Promise<
    PostgrestSingleResponse<any> | AuthResponse | { error: AuthError | null }
  >;
};

export const buildRepository = async <Return>({
  supabaseCall,
}: BuildRepositoryParams): Promise<Return> => {
  const supabaseResponse = await supabaseCall();
  if (supabaseResponse.error) {
    // This means that this is a PostgrestSingleResponse
    if ("status" in supabaseResponse) {
      throw { ...supabaseResponse.error, status: supabaseResponse.status };
    }
    // This means that this is a AuthResponse
    throw supabaseResponse.error;
  }
  if ("data" in supabaseResponse) {
    return supabaseResponse.data as Return;
  }
  return supabaseResponse as Return;
};
