import {
  EventListResponse,
  EventPartialResponse,
  EventResponse,
  EventResponseOrNull,
} from "../../../types";
import { DomainEvent } from "../entities/domainEvent";

export interface IEventRepository {
  findAll(userId: string): EventListResponse;
  findById(id: string, userId: string): EventResponseOrNull;
  save(
    userId: string,
    name: string,
    date: string,
    productIds: string[]
  ): Promise<{
    event: DomainEvent;
    products: { id: string; [key: string]: any }[];
  }>;
  update(
    id: string,
    userId: string,
    event: EventPartialResponse
  ): EventResponse;
  delete(id: string, userId: string): EventResponse;
}
