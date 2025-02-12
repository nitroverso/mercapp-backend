import { unitRepositoryImpl } from "../../infrastructure/repositories/unitRepositoryImpl";
import { UnitListResponse } from "../../../types";

const unitRepository = new unitRepositoryImpl();

export const listUnits = async (): UnitListResponse => {
  return await unitRepository.findAll();
};
