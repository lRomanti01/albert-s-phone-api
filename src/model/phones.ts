import mongoose, { Schema, model, Types } from "mongoose";

export interface phones extends mongoose.Document {
  brand: string;
  model: string;
  ram: string;
  storage: string;
  screen: string;
  processor: string;
  battery: string;
  price: string;
  amount: string;
  image: string;
  isDeleted: boolean;
}

const phonesSchema = new Schema({
  brand: {
    type: String,
    require: false,
    default: "",
  },
  model: {
    type: String,
    require: false,
    default: "",
  },
  ram: {
    type: String,
    require: false,
    default: "",
  },
  screen: {
    type: String,
    require: false,
    default: "",
  },
  storage: {
    type: String,
    require: false,
    default: "",
  },
  processor: {
    type: String,
    require: false,
    default: "",
  },
  image: {
    type: String,
    require: false,
    default: "",
  },
  battery: {
    type: String,
    require: false,
    default: "",
  },
  price: {
    type: String,
    require: false,
    default: "",
  },
  amount: {
    type: Number,
    require: false,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default model<phones>("Phones", phonesSchema);
