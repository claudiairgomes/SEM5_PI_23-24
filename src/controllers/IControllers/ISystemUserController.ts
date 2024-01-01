import { Request, Response, NextFunction } from 'express';

export default interface ISystemUserController {
  createSystemUser(req: Request, res: Response, next: NextFunction);
  removeSystemUser(req: Request, res: Response, next: NextFunction);
  getSystemUserById(req: Request, res: Response, next: NextFunction);
  getSystemUserByEmail(req: Request, res: Response, next: NextFunction);




}
