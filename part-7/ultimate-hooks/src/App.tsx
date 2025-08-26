import { useState, useEffect } from "react";
import axios from "axios";

interface FieldProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Note {
  id: number;
  content: string;
}

interface Person {
  id: number;
  name: string;
  number: string;
}

interface Service<T> {
  create: (resource: Omit<T, "id">) => Promise<void>;
}

const useField = (type: string): FieldProps => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = <T extends { id: number }>(
  baseUrl: string
): [T[], Service<T>] => {
  const [resources, setResources] = useState<T[]>([]);

  useEffect(() => {
    axios.get<T[]>(baseUrl).then((response) => setResources(response.data));
  }, [baseUrl]);

  const create = async (resource: Omit<T, "id">): Promise<void> => {
    const response = await axios.post<T>(baseUrl, resource);
    setResources((prev) => [...prev, response.data]);
  };

  const service: Service<T> = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource<Note>("http://localhost:3005/notes");
  const [persons, personService] = useResource<Person>(
    "http://localhost:3005/persons"
  );

  const handleNoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
