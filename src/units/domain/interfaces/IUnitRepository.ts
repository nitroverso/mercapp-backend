import { UnitListResponse } from "../../../types";

export interface IUnitRepository {
  findAll(): UnitListResponse;
}
