const Person = require('../models/person');

exports.index = (request, response) => {
  Person.find({}).then((people) => {
    return response.json(people);
  });
};

exports.show = (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        return response.json(person);
      } else {
        return response.status(404).end();
      }
    })
    .catch((error) => next(error));
};

exports.info = (request, response) => {
  const date = new Date();

  Person.count().then((count) => {
    return response.send(
      `<h2>Phonebook has info for ${count} people</h2><br/><p>${date}</p>`
    );
  });
};

exports.delete = (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      return response.status(204).end();
    })
    .catch((error) => next(error));
};

exports.create = (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((result) => {
      return response.status(201).json(result);
    })
    .catch((error) => next(error));
};

exports.update = (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
    .then((updatedNote) => {
      return response.json(updatedNote);
    })
    .catch((error) => next(error));
};
