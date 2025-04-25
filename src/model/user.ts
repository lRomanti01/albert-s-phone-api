import mongoose, { Schema, model, Types } from "mongoose";

export interface user extends mongoose.Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  isActived: boolean;
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
  role: Types.ObjectId;
  code: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: false,
  },
  password: {
    type: String,
    require: true,
  },
  isActived: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Roles",
    require: true,
  },
  code: {
    type: String,
    require: false,
  },
  created_at: {
    type: String,
    default: new Date().toISOString(),
    require: true,
  },
  updated_at: {
    type: String,
    default: new Date().toISOString(),
    require: true,
  },
});

export default model<user>("User", userSchema);
