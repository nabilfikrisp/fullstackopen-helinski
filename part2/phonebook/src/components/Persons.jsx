import React from "react";

const Persons = ({ array }) => {
  return (
    <ul>
      {array.map((person) => (
        <>
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        </>
      ))}
    </ul>
  );
};

export default Persons;
