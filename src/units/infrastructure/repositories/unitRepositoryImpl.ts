import { IUnitRepository } from "../../domain/interfaces/IUnitRepository";
import { Unit } from "../../domain/entities/unit";
import supabase from "../../../config/supabase";
import { TABLES } from "../../../constants/mpConstanst";
import { UnitListResponse } from "../../../types";

export class unitRepositoryImpl implements IUnitRepository {
  async findAll(): UnitListResponse {
    const { data, error } = await supabase.from(TABLES.UNITS).select("*");
    if (error) throw new Error(error.message);
    return data as Unit[];
  }
}
