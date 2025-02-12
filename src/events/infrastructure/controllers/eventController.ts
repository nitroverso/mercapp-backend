import { Response } from "express";
import {
  listEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  saveEvent,
} from "../../application/services/EventService";
import { AuthenticatedRequest, STATUS_CODES } from "../../../types";
import { buildController, parseResponse } from "../../../utils";

export const getEvents = async (req: AuthenticatedRequest, res: Response) => {
  const callback = async () => {
    const userId = req.user!.id;
    const data = await listEvents(userId);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    }
  };
  buildController({ req, res, callback });
};

export const getEvent = async (req: AuthenticatedRequest, res: Response) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = await getEventById(id, userId);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s200, data }));
    } else {
      res
        .status(STATUS_CODES.s404)
        .json(parseResponse({ code: STATUS_CODES.s404 }));
    }
  };
  buildController({ req, res, callback });
};

export const addEventWithProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const callback = async () => {
    const { name, date, productIds } = req.body;
    const userId = req.user!.id;
    const data = await saveEvent(userId, name, date, productIds);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s201, data }));
    }
  };
  buildController({ req, res, callback });
};

export const updateEventController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const eventData = req.body;
    const data = await updateEvent(id, userId, eventData);
    if (data) {
      res.json(parseResponse({ code: STATUS_CODES.s201, data }));
    }
  };
  buildController({ req, res, callback });
};

export const deleteEventController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const callback = async () => {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = await deleteEvent(id, userId);
    if (data) {
      res.status(STATUS_CODES.s204).send();
    }
  };
  buildController({ req, res, callback });
};
