import mongoose, { Schema, model, Types } from "mongoose";
import { user } from './user';

export interface soldPhones extends mongoose.Document {
  phone: Types.ObjectId;
  user: Types.ObjectId;
  amount: string;
  client: string;
  price: string;
  total: number;
  createdAt: Date;
}

const soldPhonesSchema = new Schema({
  phone: {
    type: Schema.Types.ObjectId,
    ref: "Phones",
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: false,
  },
  client: {
    type: String,
    require: false,
    default: "",
  },
  amount: {
    type: Number,
    require: false,
    default: 0,
  },
  price: {
    type: Number,
    require: false,
    default: 0,
  },
  total: {
    type: Number,
    require: false,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<soldPhones>("soldPhones", soldPhonesSchema);
