import { Response } from "express";
import { listUnits } from "../../application/services/unitServices";
import { buildController, parseResponse } from "../../../utils";
import { AuthenticatedRequest, STATUS_CODES } from "../../../types";

export const getUnits = async (req: AuthenticatedRequest, res: Response) => {
  const callback = async () => {
    const data = await listUnits();
    console.log({ data });
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
  };
  buildController({ req, res, callback });
};
