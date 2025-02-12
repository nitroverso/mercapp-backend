import {
  EventListResponse,
  EventPartialResponse,
  EventResponse,
  EventResponseOrNull,
} from "../../../types";

export interface IEventRepository {
  findAll(userId: string): EventListResponse;
  findById(id: string, userId: string): EventResponseOrNull;
  save(
    userId: string,
    date: string,
    name: string,
    productIds: string[]
  ): EventResponse;
  update(
    id: string,
    userId: string,
    event: EventPartialResponse
  ): EventResponse;
  delete(id: string, userId: string): EventResponse;
}
