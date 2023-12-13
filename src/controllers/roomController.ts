import {Response, Request, NextFunction} from 'express';
import {Container, Inject, Service} from 'typedi';
import config from '../../config';
import {IRoomDTO} from "../dto/IRoomDTO";
import {Result} from "../core/logic/Result";
import IRoomController from "./IControllers/IRoomController";
import IRoomService from "../services/IServices/IRoomService";

@Service()
export default class RoomController implements IRoomController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.room.name) private roomServiceInstance : IRoomService
  ) {}

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = await this.roomServiceInstance.createRoom(req.body as IRoomDTO) as Result<IRoomDTO>;

      if (roomOrError.isFailure) {
        return res.status(402).send();
      }

      const roomDTO = roomOrError.getValue();
      return res.json( roomDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = await this.roomServiceInstance.updateRoom(req.body as IRoomDTO) as Result<IRoomDTO>;

      if (roomOrError.isFailure) {
        return res.status(404).send();
      }

      const roomDTO = roomOrError.getValue();
      return res.status(201).json( roomDTO );
    }
    catch (e) {
      return next(e);
    }
  };
  public async getAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await this.roomServiceInstance.getAllRooms();

      if (!rooms || rooms.length === 0) {
        // Return an appropriate response if there are no rooms
        return res.status(404).json({ message: 'No rooms found' });
      }

      return res.status(200).json(rooms);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error while fetching rooms:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


  async getRoomById(req: Request, res: Response, next: NextFunction) {
    try{
    const roomOrError = await this.roomServiceInstance.getRoomById(req.body) as Result<IRoomDTO>;

    if (roomOrError.isFailure) {
      return res.status(404).send();
    }

    const roomDTO = roomOrError.getValue();
    return res.status(201).json( roomDTO );
  }
  catch (e) {
    return next(e);
  }
  }


}
