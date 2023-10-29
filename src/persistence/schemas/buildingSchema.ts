import mongoose from "mongoose";
import {IBuildingPersistence} from "../../dataschema/IBuildingPersistence";

const BuildingSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: {
      type: String
      , required: [true, 'Please enter building id'],
      //index: true,
    },

    description: {
      type: String
     ,required: [false, 'Enter description (optional)'],
      //index: true,
    },

    dimension: {
      type: String
      ,required: [true, 'Please enter building dimension'],
      //index: true,
    },

    code: {
      type: String
      ,required: [true, 'Please enter building code'],
      //index: true,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building',BuildingSchema)
