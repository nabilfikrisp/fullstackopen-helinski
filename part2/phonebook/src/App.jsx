import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import personApi from "./api/person.api";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data, "promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [query, setQuery] = useState("");
  const [filteredPerson, setFilteredPerson] = useState(persons);

  const isDuplicate = (name) => {
    return persons.some((person) => person.name === name);
  };

  const isDuplicateNumber = (number) => {
    return persons.some((person) => person.number === number);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPerson.name.trim() === "") {
      alert("Please fill in the name.");
      return;
    }

    if (isDuplicateNumber(newPerson.number)) {
      alert(`${newPerson.number} is already in the phonebook.`);
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
          alert(`successfully updated ${response.name}`);

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
      })
      .catch((error) => {
        alert(error);
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
        .then(() => {
          // on client delete
          const toDelete = new Set([id]);
          const newArray = persons.filter((obj) => !toDelete.has(obj.id));
          setPersons(newArray);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <div>
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
