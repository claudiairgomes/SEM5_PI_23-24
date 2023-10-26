import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const Robot = new mongoose.Schema(
  {

    domainId: {
      type: String,
      unique: true
    },

    codRobot: {
      type: String,
      unique: true
    },

    nickname: {
      type: String,
      required: [true, 'Please enter robot nickname'],
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
  },
  { timestamps: true },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('robot', Robot);
