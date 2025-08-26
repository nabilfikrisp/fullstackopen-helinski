import React, { useState, FormEvent } from "react";
import { useField } from "./hooks/useField";
import { useCountry } from "./hooks/useCountry";
import { Country } from "./components/Country";

const App: React.FC = () => {
  const nameInput = useField("text");
  const [name, setName] = useState<string>("");
  const country = useCountry(name);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
