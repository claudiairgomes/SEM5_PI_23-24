import { Request, Response, NextFunction } from 'express';

export default interface IBuildingController{
  createBuilding(req: Request, res: Response, next: NextFunction);
  updateBuilding(req: Request, res: Response, next: NextFunction);

  getBuildings(req: Request, res: Response, next: NextFunction);
  getBuildingsByRange(req: Request, res: Response, next: NextFunction);
  getBuildingById(req: Request, res: Response, next: NextFunction);
}
