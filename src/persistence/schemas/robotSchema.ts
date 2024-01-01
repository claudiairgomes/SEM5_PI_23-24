import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const RobotSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    codRobot: {
      type: String,
      unique: true
    },

    name: {
      type: String,
      required: [true, 'Please enter robot name'],
      index: true,
    },

    type: {
      type: String,
      required: [true, 'Please select type'],
      index: true,
    },

    serialNumber: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: [true, 'Please write description'],
      index: true,
    },

    isActive: {
      type: Boolean,
      required: [true, 'Please write if robot is active (true/false)'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('robot', RobotSchema);
