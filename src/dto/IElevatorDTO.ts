import {Building} from "../domain/building";
import {Floor} from "../domain/floor";

export  interface IElevatorDTO{
  id: string;
  building: Building;
  floorList: Floor[];
  brand: string;
  model: string;
  serialNumber: string;
  description: string;
}
