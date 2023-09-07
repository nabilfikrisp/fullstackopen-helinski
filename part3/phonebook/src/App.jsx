import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import personApi from "./api/person.api";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personApi.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [query, setQuery] = useState("");
  const [filteredPerson, setFilteredPerson] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const isDuplicate = (name) => {
    return persons.some((person) => person.name === name);
  };

  const isDuplicateNumber = (number) => {
    return persons.some((person) => person.number === number);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPerson.name.trim() === "") {
      setIsError(true);
      setErrorMessage("Please fill in the name.");
      return;
    }

    if (isDuplicateNumber(newPerson.number)) {
      setIsError(true);
      setErrorMessage(`${newPerson.number} is already in the phonebook.`);
      return;
    }

    if (isDuplicate(newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already on the list, replace the old number with the new one`
        )
      ) {
        const personToUpdateIdx = persons.findIndex(
          (person) => person.name === newPerson.name
        );
        const personToUpdate = persons[personToUpdateIdx];
        personApi.update(personToUpdate.id, newPerson).then((response) => {
          setPersons((prev) =>
            prev.map((person) =>
              person.id === response.id
                ? { ...person, number: response.number }
                : person
            )
          );

          setFilteredPerson((prev) =>
            prev.map((person) =>
              person.id === response.id
                ? { ...person, number: response.number }
                : person
            )
          );
          setNewPerson({ name: "", number: "" });
          setIsError(false);
          setErrorMessage(`successfully updated ${response.name}`);
        });
      }
      return;
    }

    personApi
      .create(newPerson)
      .then((response) => {
        const updatedPersons = [...persons, { ...response }];

        setPersons(updatedPersons);
        setFilteredPerson(updatedPersons);
        setNewPerson({ name: "", number: "" });
        setIsError(false);
        setErrorMessage(`successfully created ${newPerson.name}`);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(`${error}`);
      });
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const updatedFilteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(query)
    );
    setFilteredPerson(updatedFilteredPersons);
  }, [query, persons]);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value.toLowerCase();
    setQuery(newQuery);
  };

  const deletePerson = (id) => {
    if (window.confirm(`delete person ${id}`)) {
      // on server delete
      personApi
        .deleteById(id)
        .then((response) => {
          // on client delete
          const toDelete = new Set([id]);
          const newArray = persons.filter((obj) => !toDelete.has(obj.id));
          setPersons(newArray);
          setIsError(false);
          setErrorMessage(`${response}`);
        })
        .catch((error) => {
          setIsError(true);
          setErrorMessage(`${error}`);
        });
    }
  };

  return (
    <div>
      <Notification message={errorMessage} isError={isError} />
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleQueryChange} />
      <PersonForm
        onSubmit={handleSubmit}
        onChange={handleOnChange}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Persons array={filteredPerson} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
