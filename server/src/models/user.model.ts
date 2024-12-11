import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  authToken: string;
  activeApp?: { appId: string; tabId: string };
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    authToken: { type: String, required: true, unique: true, index: true },
    activeApp: {
      appId: { type: String },
      tabId: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export { User }