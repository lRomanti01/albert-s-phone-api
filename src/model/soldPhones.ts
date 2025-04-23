import mongoose, { Schema, model, Types } from "mongoose";
import { user } from './user';

export interface soldPhones extends mongoose.Document {
  phone: Types.ObjectId;
  user: Types.ObjectId;
  amount: string;
  client: string;
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
    require: true,
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
});

export default model<soldPhones>("soldPhones", soldPhonesSchema);
