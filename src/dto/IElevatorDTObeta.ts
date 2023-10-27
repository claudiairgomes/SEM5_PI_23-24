import {Building} from "../domain/building";
import {Floor} from "../domain/floor";

export  interface IElevatorDTObeta{
  id: string;
  building: string;
  floorList: string[];
  brand: string;
  model: string;
  serialNumber: string;
  description: string;
}
