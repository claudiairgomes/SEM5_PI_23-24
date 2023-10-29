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
      , required: [true, 'Please enter building id'],
      //index: true,
    },

    floorsList: {
      type: Array <string>()
      , required: [true, 'Please enter floor ids']
    },

    brand: {
      type: String
      , required: [true, 'Please enter brand'],
    },

    model: {
      type: String
      , required: [true, 'Please enter model'],
    },

    serialNumber: {
      type: String
      , required: [true, 'Please enter serial number'],
    },

    description: {
      type: String
      , required: [false, 'Please enter description (optional)'],
    },
  },
  {
    timestamps: true
  }

);
export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator',ElevatorSchema)
