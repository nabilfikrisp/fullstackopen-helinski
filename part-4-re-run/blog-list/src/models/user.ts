import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    minLength: 3,
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
  name: {
    minLength: 3,
    required: true,
    trim: true,
    type: String,
  },
  passwordHash: {
    minLength: 3,
    required: true,
    type: String,
  },
  blogs: [
    {
      ref: "Blog",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject: Partial<Record<string, unknown>>) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export type IUser = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model<IUser>("User", userSchema);
export type IUserWithId = IUser & {
  id: string;
};
export type IUserForCreation = Omit<IUser, "id" | "blogs"> & {
  password: string;
};
export type IUserForLogin = Omit<IUser, "id" | "blogs" | "passwordHash"> & {
  password: string;
};

export interface IUserJWT {
  username: string;
  id: Types.ObjectId;
}
