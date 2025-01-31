import { Event } from "../entities/event";

export interface IEventRepository {
  findAll(userId: string): Promise<Event[]>;
  findById(id: string, userId: string): Promise<Event | null>;
  save(event: Event): Promise<void>;
  update(id: string, userId: string, event: Partial<Event>): Promise<void>;
  delete(id: string, userId: string): Promise<void>;
}
