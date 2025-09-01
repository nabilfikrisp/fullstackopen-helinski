import { Schema, model, InferSchemaType } from "mongoose";

const authorSchema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 4 },
  born: { type: Number, required: false },
});

authorSchema.set("toJSON", {
  transform: (_document, returnedObject: Partial<Record<string, unknown>>) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type AuthorDocument = InferSchemaType<typeof authorSchema>;
export type Author = Omit<AuthorDocument, "_id"> & { id: string };
export const AuthorModel = model("Author", authorSchema);
