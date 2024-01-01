import {NextFunction, Request, Response} from "express";

export default interface IElevatorController{
  createElevator(req: Request, res: Response, next: NextFunction);
  updateElevator(req: Request, res: Response, next: NextFunction);
  getElevators(req: Request, res: Response, next: NextFunction);
  getElevatorByBuilding(req: Request, res: Response, next: NextFunction);
  getElevatorById(req: Request, res: Response, next: NextFunction);
}
