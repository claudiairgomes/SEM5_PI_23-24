import {IPassagePersistence} from "../../dataschema/IPassagePersistence";
import mongoose from "mongoose";

const passageSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },

    name: {
      type: String
      , required: [true, 'Please enter passage name'],
      //index: true,
    },

    fromFloor: {
      type: String,
      required: [true, 'Please enter fromFloor'],
      index: true,
    },

    toFloor: {
      type: String,
      required: [true, 'Please enter fromFloor'],
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
