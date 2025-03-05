import { IUnitRepository } from "../../domain/interfaces/IUnitRepository";
import { Unit } from "../../domain/entities/unit";
import supabase from "../../../config/supabase";
import { TABLES } from "../../../constants/mpConstanst";
import { UnitListResponse } from "../../../types";
import { buildRepository } from "../../../utils/utils";

const TABLE_NAME = TABLES.UNITS;
export class unitRepositoryImpl implements IUnitRepository {
  async findAll(): UnitListResponse {
    const supabaseCall = async () => {
      return await supabase.from(TABLE_NAME).select("*");
    };
    return buildRepository<Unit[]>({ supabaseCall });
  }
}
