import { Event } from "../../domain/entities/event";
import { EventRepository } from "../../infrastructure/repositories/eventRepositoryImpl";

const eventRepository = new EventRepository();

export const listEvents = async (userId: string): Promise<Event[]> => {
  return await eventRepository.findAll(userId);
};

export const getEventById = async (
  id: string,
  userId: string
): Promise<Event | null> => {
  return await eventRepository.findById(id, userId);
};

export const createEventWithProducts = async (
  userId: string,
  date: string,
  name: string,
  productIds: string[]
): Promise<void> => {
  await eventRepository.createEventWithShoppyList(
    userId,
    date,
    name,
    productIds
  );
};

export const updateEvent = async (
  id: string,
  userId: string,
  event: Partial<Event>
): Promise<void> => {
  await eventRepository.update(id, userId, event);
};

export const deleteEvent = async (
  id: string,
  userId: string
): Promise<void> => {
  await eventRepository.delete(id, userId);
};
