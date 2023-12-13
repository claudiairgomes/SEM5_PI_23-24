import { Request, Response, NextFunction } from 'express';
import {Result} from "../../core/logic/Result";
import {IPassageDTO} from "../../dto/IPassageDTO";

export default interface IPassageController{
  createPassage(req: Request, res: Response, next: NextFunction);
  updatePassage(req: Request, res: Response, next: NextFunction);
  getAllPassages(req: Request, res: Response, next: NextFunction);
  getPassageById(req: Request, res: Response, next: NextFunction);

}
