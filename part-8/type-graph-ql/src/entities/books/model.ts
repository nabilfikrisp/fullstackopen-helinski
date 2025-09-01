import { Schema, model, InferSchemaType } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true, minlength: 5 },
  published: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  genres: [{ type: String }],
});

bookSchema.set("toJSON", {
  transform: (_document, returnedObject: Partial<Record<string, unknown>>) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type BookDocument = InferSchemaType<typeof bookSchema>;
export type Book = Omit<BookDocument, "_id"> & { id: string };
export const BookModel = model("Book", bookSchema);
