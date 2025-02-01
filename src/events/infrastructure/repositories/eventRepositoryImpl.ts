import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { Event } from "../../domain/entities/event";
import supabase from "../../../config/supabase";
import { COLUMNS, TABLES } from "../../../constants/mpConstanst";

export class EventRepository implements IEventRepository {
  async findAll(userId: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from(TABLES.EVENTS)
      .select("*")
      .eq(COLUMNS.USER_ID, userId);

    if (error) throw new Error(error.message);
    return data as Event[];
  }

  async findById(id: string, userId: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from(TABLES.EVENTS)
      .select("*")
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId)
      .single();

    if (error) return null;
    return data as Event;
  }

  async save(event: Event): Promise<void> {
    const { error } = await supabase.from(TABLES.EVENTS).insert([event]);

    if (error) throw new Error(error.message);
  }

  async createEventWithShoppyList(
    userId: string,
    name: string,
    date: string,
    productIds: string[]
  ): Promise<void> {
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

    const { data: validProducts, error: productError } = await supabase
      .from(TABLES.PRODUCTS)
      .select("id")
      .in(COLUMNS.ID, productIds);

    if (productError) {
      throw new Error(`Error al validar productos: ${productError.message}`);
    }

    const validProductIds = validProducts.map((p) => p.id);

    if (validProductIds.length !== productIds.length) {
      throw new Error("Uno o más productos no existen en la base de datos.");
    }

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
  }

  async update(
    id: string,
    userId: string,
    event: Partial<Event>
  ): Promise<void> {
    const { error } = await supabase
      .from(TABLES.EVENTS)
      .update(event)
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId);

    if (error) throw new Error(error.message);
  }

  async delete(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.EVENTS)
      .delete()
      .eq(COLUMNS.ID, id)
      .eq(COLUMNS.USER_ID, userId);

    if (error) throw new Error(error.message);
  }
}
