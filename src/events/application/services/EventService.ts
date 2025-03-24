import {
  EventListResponse,
  EventPartialResponse,
  EventResponse,
  EventResponseOrNull,
} from "../../../types";
import { EventRepository } from "../../infrastructure/repositories/eventRepositoryImpl";

const eventRepository = new EventRepository();

export const listEvents = async (userId: string): EventListResponse => {
  return await eventRepository.findAll(userId);
};

export const getEventById = async (
  id: string,
  userId: string
): EventResponseOrNull => {
  return await eventRepository.findById(id, userId);
};

export const saveEvent = async (
  userId: string,
  date: string,
  name: string,
  productIds: string[]
): EventResponse => {
  return await eventRepository.save(userId, name, date, productIds);
};

export const updateEvent = async (
  id: string,
  userId: string,
  event: EventPartialResponse
): EventResponse => {
  return await eventRepository.update(id, userId, event);
};

export const deleteEvent = async (
  id: string,
  userId: string
): EventResponse => {
  return await eventRepository.delete(id, userId);
};
