import mongoose from "mongoose";
import {IRoomPersistence} from "../../dataschema/IRoomPersistence";

const RoomSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },

    floor: {
      type: String
      ,required: [true, 'Please enter floor'],
      //index: true,
    },

    name: {
      type: String
      , required: [true, 'Please enter room name'],
      //index: true,
    },

    description: {
      type: String
     ,required: [false, 'Enter description (optional)'],
      //index: true,
    },

    dimension: {
      type: String
      ,required: [true, 'Please enter room dimension'],
      //index: true,
    },

    code: {
      type: String
      ,required: [true, 'Please enter room code'],
      //index: true,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room',RoomSchema)
