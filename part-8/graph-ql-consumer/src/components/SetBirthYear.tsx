import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { EDIT_AUTHOR } from "../queries/mutations";
import { ALL_AUTHORS } from "../queries/queries";
import { Author } from "../types";

export const SetBirthYear = ({ authors }: { authors: Author[] }) => {
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAuthor && birthYear) {
      editAuthor({
        variables: {
          name: selectedAuthor,
          setBornTo: parseInt(birthYear),
        },
      });
      setSelectedAuthor("");
      setBirthYear("");
    }
  };

  return (
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Author:
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <option value="">Select author</option>
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Birth year:
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Update birth year</button>
      </form>
    </div>
  );
};
