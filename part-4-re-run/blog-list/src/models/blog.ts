import mongoose, { InferSchemaType } from "mongoose";

const blogSchema = new mongoose.Schema({
  likes: {
    default: 0,
    type: Number,
  },
  title: {
    minLength: 3,
    required: true,
    trim: true,
    type: String,
  },
  url: {
    trim: true,
    type: String,
  },
  author: {
    minLength: 3,
    required: true,
    trim: true,
    type: String,
  },
});

blogSchema.set("toJSON", {
  transform: (_document, returnedObject: Partial<Record<string, unknown>>) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type IBlog = InferSchemaType<typeof blogSchema>;
export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
export type IBlogWithId = IBlog & {
  id: string;
};
export type IBlogForCreation = Omit<IBlog, "id" | "user">;
