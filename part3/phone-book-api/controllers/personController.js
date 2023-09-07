const { response } = require("express");
const Person = require("../models/person");

let persons = require("../models/person");

exports.index = (request, response) => {
  Person.find({}).then((people) => {
    return response.json(people);
  });
};

exports.show = (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      return response.json(person);
    })
    .catch((error) => {
      return console.log("error on person controller:", error);
    });
};

exports.info = (request, response) => {
  const date = new Date();

  Person.count().then((count) => {
    return response.send(
      `<h2>Phonebook has info for ${count} people</h2><br/><p>${date}</p>`
    );
  });
};

exports.delete = (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
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

  if (Person.find({ name: body.name }) !== null) {
    return response.status(400).json({
      error: "name already exsist",
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

const isDuplicate = (name) => {
  return persons.some(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );
};
