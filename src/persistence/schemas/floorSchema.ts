import mongoose from "mongoose";
import {IFloorPersistence} from "../../dataschema/IFloorPersistence";

const FloorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },

    building: {
      type: String,
      required: [true, 'Please enter building id'],
      index: true,
    },

    name: {
      type: String,
      required: [true, 'Please enter floor name'],
      index: true,
    },

    number: {
      type: Number,
      required: [true, 'Please enter floor number'],
    },
    description: {
      type: String,
      required: [false, 'Enter description (optional)'],
      index: true,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor',FloorSchema)
