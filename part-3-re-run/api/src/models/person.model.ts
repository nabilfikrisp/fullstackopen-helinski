import mongoose, { InferSchemaType, Schema } from "mongoose";

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v: string) =>
        // Custom validator: matches exactly either 8+ digits or X-Y where X=2‑3 digits and Y=6+ digits
        /^(?:\d{8,}|\d{2,3}-\d{6,})$/.test(v),
      message: (props) =>
        `${props.value} is not a valid phone number! Must be 8+ digits or 2-3 digits + "-" + 6+ digits.`,
    },
  },
});

export type IPerson = InferSchemaType<typeof personSchema>;

personSchema.set("toJSON", {
  transform: (_document, returnedObject: Partial<Record<string, unknown>>) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Person = mongoose.model<IPerson>("Person", personSchema);
