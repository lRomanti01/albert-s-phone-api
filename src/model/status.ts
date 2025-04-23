import mongoose, { Schema, model } from "mongoose";

export interface status extends mongoose.Document {
  _id: string;
  name: string;
  code: string;
}

const statusSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
});

export default model<status>("Status", statusSchema);
