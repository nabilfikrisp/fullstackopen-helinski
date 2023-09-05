const { response } = require("express");
const generateId = require("../utils/generateId");
let persons = require("../models/person");

exports.index = (request, response) => {
  response.json(persons);
};

exports.show = (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
};

exports.info = (request, response) => {
  const totalPerson = persons.length;
  const date = new Date();
  response.send(
    `<h2>Phonebook has info for ${totalPerson} people</h2><br/><p>${date}</p>`
  );
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

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(persons),
  };

  persons = [...persons, newPerson];

  response.status(201).json(newPerson);
};
