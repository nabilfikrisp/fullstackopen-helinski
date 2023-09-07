import React from "react";

const Persons = ({ array, deletePerson }) => {
  return (
    <ul>
      {array.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button type="button" onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons; 
