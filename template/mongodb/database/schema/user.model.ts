import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  fullName: string;
  username: string;
  picture: string;
}

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: [true, "ClerkId is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    fullName: { type: String },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    picture: { type: String },
  },
  { timestamps: true }
);

const User = models?.User || model("User", userSchema);

export default User;
