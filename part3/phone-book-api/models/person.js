const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  id: 'string',
  name: {
    type: 'string',
    unique: true,
    required: true,
    minLength: 3,
  },
  number: {
    type: 'string',
    unique: true,
    required: true,
    minLength: 8,
    validate: {
      validator: function (value) {
        return /^(?:\d{2,3}-\d+)$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
