import { Request, Response } from "express";
import {
  listEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createEventWithProducts,
} from "../../application/services/EventService";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const getEvents = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const events = await listEvents(userId);
    res.json(events);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ha ocurrido un problema" });
    }
  }
};

export const getEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const event = await getEventById(id, userId);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "No se encontró el evento" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ha ocurrido un problema" });
    }
  }
};

export const addEventWithProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { name, date, productIds } = req.body;
    const userId = req.user!.id;

    await createEventWithProducts(userId, name, date, productIds);

    res.status(201).json({
      message: "Evento y lista de compras creados satisfactoriamente",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ha ocurrido un problema" });
    }
  }
};

export const updateEventController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const eventData = req.body;
    await updateEvent(id, userId, eventData);
    res.json({ message: "Evento actualizado satisfactoriamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ha ocurrido un problema" });
    }
  }
};

export const deleteEventController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    await deleteEvent(id, userId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ha ocurrido un problema" });
    }
  }
};
