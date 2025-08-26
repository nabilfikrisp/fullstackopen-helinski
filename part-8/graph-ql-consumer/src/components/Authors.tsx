import { ComponentProps, Author } from "../types";
import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries/queries";
import { SetBirthYear } from "./SetBirthYear";

const Authors = ({ show }: ComponentProps): JSX.Element | null => {
  if (!show) {
    return null;
  }

  const { loading, error, data } = useQuery<{ allAuthors: Author[] }>(
    ALL_AUTHORS
  );

  if (loading || !data) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error: {error.message}</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a: Author) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authors={data.allAuthors} />
    </div>
  );
};

export default Authors;
