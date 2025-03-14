import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import supabase from "../../../config/supabase";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";
import {
  EventListResponse,
  EventPartialResponse,
  EventResponseOrNull,
  EventResponse,
} from "../../../types";
import { DomainEvent } from "../../domain/entities/domainEvent";
import { buildRepository } from "../../../utils/utils";

const TABLE_NAME = TABLES.EVENTS;
const TABLE_NAME_PRODUCTS = TABLES.PRODUCTS;
const TABLE_NAME_SHOPPY_LIST = TABLES.SHOPPY_LIST;
export class EventRepository implements IEventRepository {
  async findAll(userId: string): EventListResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq(COLUMNS.USER_ID, userId);
    };
    return buildRepository<DomainEvent[]>({ supabaseCall });
  }

  async findById(id: string, userId: string): EventResponseOrNull {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .single();
    };
    return buildRepository<DomainEvent | null>({ supabaseCall });
  }

  async save(
    userId: string,
    date: string,
    name: string,
    productIds: string[]
  ): EventResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME_PRODUCTS)
        .select("id")
        .in(COLUMNS.ID, productIds);
    };
    const validateProducts = await buildRepository<{ id: string }[]>({
      supabaseCall,
    });

    console.log({ validateProducts });
    console.log({ productIds });
    if (
      validateProducts.length !== productIds.length ||
      validateProducts.length <= 0
    ) {
      throw new Error(
        "Uno o más productos no existen en la base de datos o no insertaste productos."
      );
    }
    const validProductIds = validateProducts.map((product) => product.id);
    console.log({ validProductIds });
    const createEvent = async () => {
      return await supabase
        .from(TABLE_NAME)
        .insert({ name, date, user_id: userId })
        .eq(COLUMNS.USER_ID, userId)
        .select()
        .single();
    };
    const eventData = await buildRepository<DomainEvent>({
      supabaseCall: createEvent,
    });
    const eventId = eventData.id;
    const shoppyListEntries = validProductIds.map((productId) => ({
      events_id: eventId,
      products_id: productId,
    }));

    const insertShoppyListEntries = async () => {
      return await supabase
        .from(TABLE_NAME_SHOPPY_LIST)
        .insert(shoppyListEntries);
    };

    await buildRepository<DomainEvent>({
      supabaseCall: insertShoppyListEntries,
    });
    return eventData;
  }

  async update(
    id: string,
    userId: string,
    event: EventPartialResponse
  ): EventResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .update(event)
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .select()
        .single();
    };
    return buildRepository<DomainEvent>({ supabaseCall });
  }

  async delete(id: string, userId: string): EventResponse {
    const supabaseCall = async () => {
      return await supabase
        .from(TABLE_NAME)
        .delete()
        .eq(COLUMNS.ID, id)
        .eq(COLUMNS.USER_ID, userId)
        .select()
        .single();
    };
    return buildRepository<DomainEvent>({ supabaseCall });
  }
}
