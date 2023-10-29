import {IPassagePersistence} from "../../dataschema/IPassagePersistence";
import mongoose from "mongoose";

const passageSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    fromFloorId: {
      type: String,
      required: [true, 'Please enter fromFloorId'],
      index: true,
    },

    toFloorId: {
      type: String,
      required: [true, 'Please enter fromFloorId'],
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

export default mongoose.model<IPassagePersistence & mongoose.Document>('passage',passageSchema)
