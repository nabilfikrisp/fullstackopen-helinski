const { response } = require("express");
const Person = require("../models/person");

let persons = require("../models/person");

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
    .then((result) => {
      return response.status(204).end();
    })
    .catch((error) => next(error));
};

exports.create = (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!body.name) {
    return response.status(400).json({
      error: "name field missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number field missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((result) => {
      return response.status(201).json(result);
    })
    .catch((error) => {
      return response.statis(400).json(`error saving data: ${error}`);
    });
};

exports.update = (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedNote) => {
      return response.json(updatedNote);
    })
    .catch((error) => next(error));
};
