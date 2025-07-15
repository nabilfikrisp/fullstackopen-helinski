import type { Person } from "../types/person";

type PersonProps = {
  persons: Person[];
  onRemove: (person: Person) => void;
};

const Persons = ({ persons, onRemove }: PersonProps) =>
  persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => onRemove(person)}>delete</button>
    </p>
  ));

export default Persons;
