import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPerson.name.trim() === "") {
      alert("Please fill in the name.");
      return;
    }

    if (isDuplicate(newPerson.name)) {
      alert(`${newPerson.name} is already in the phonebook.`);
      return;
    }

    const updatedPersons = [...persons, { ...newPerson, id: Date.now() }];

    setPersons(updatedPersons);
    setFilteredPerson(updatedPersons);
    setNewPerson({ name: "", number: "" });
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
      <Persons array={filteredPerson} />
    </div>
  );
};

export default App;
