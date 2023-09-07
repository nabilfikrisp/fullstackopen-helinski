const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    unique: true,
  },
  number: {
    type: String,
    unique: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
