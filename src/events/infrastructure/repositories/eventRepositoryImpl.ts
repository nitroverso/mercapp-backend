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

export class EventRepository implements IEventRepository {
  async findAll(userId: string): EventListResponse {
    const { data, error } = await supabase
      .from(TABLES.EVENTS)
      .select("*")
      .eq(COLUMNS.USER_ID, userId);

    if (error) throw new Error(error.message);
    return data as DomainEvent[];
  }

  async findById(id: string, userId: string): EventResponseOrNull {
    const { data, error } = await supabase
      .from(TABLES.EVENTS)
      .select("*")
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId)
      .single();

    if (error) return null;
    return data as DomainEvent;
  }

  async save(
    userId: string,
    name: string,
    date: string,
    productIds: string[]
  ): EventResponse {
    const { data: validProducts, error: productError } = await supabase
      .from(TABLES.PRODUCTS)
      .select("id")
      .in(COLUMNS.ID, productIds);
    console.log("contribuidor");
    if (productError) {
      throw new Error(`Error al validar productos: ${productError.message}`);
    }
    console.log({ data: validProducts });
    const validProductIds = validProducts.map((p) => p.id);
    console.log({ validProductIds });

    if (validProductIds.length !== productIds.length) {
      throw new Error("Uno o más productos no existen en la base de datos.");
    }

    const { data: eventData, error: eventError } = await supabase
      .from(TABLES.EVENTS)
      .insert([
        {
          user_id: userId,
          name,
          date,
          completed: false,
          precio_total: 0,
        },
      ])
      .select()
      .single();
    if (eventError) {
      throw new Error(`Error al crear el evento: ${eventError.message}`);
    }
    const eventId = eventData.id;

    const shoppyListEntries = validProductIds.map((productId) => ({
      events_id: eventId,
      products_id: productId,
    }));

    const { error: insertError } = await supabase
      .from(TABLES.SHOPPY_LIST)
      .insert(shoppyListEntries);

    if (insertError) {
      throw new Error(
        `Error al crear la lista de compras: ${insertError.message}`
      );
    }
    return eventData;
  }

  async update(
    id: string,
    userId: string,
    event: EventPartialResponse
  ): EventResponse {
    const { data, error } = await supabase
      .from(TABLES.EVENTS)
      .update(event)
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as DomainEvent;
  }

  async delete(id: string, userId: string): EventResponse {
    const { data, error } = await supabase
      .from(TABLES.EVENTS)
      .delete()
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as DomainEvent;
  }
}
