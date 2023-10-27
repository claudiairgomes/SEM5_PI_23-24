import mongoose from "mongoose";
import {IBuildingPersistence} from "../../dataschema/IBuildingPersistence";
import {IElevatorPersistence} from "../../dataschema/IElevatorPersistence";
import {Building} from "../../domain/building";
import {Floor} from "../../domain/floor";

const ElevatorSchema = new mongoose.Schema(

  {

    domainId: { type: String, unique: true },
    building: {
      type: String//Building
      //, required: [true, 'Please enter building name'],
      //index: true,
    },

    floorList: {
      type: String//[Floor]
    },

    brand: {
      type: String

    },

    model: {
      type: String

    },

    serialNumber: {
      type: String

    },

    description: {
      type: String

    },
  },
  {
    timestamps: true
  }

);
export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator',ElevatorSchema)
