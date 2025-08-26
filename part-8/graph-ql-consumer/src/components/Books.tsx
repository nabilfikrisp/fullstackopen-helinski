import { ALL_BOOKS } from "../queries/queries";
import { ComponentProps, Book } from "../types";
import { useQuery } from "@apollo/client/react";

const Books = ({ show }: ComponentProps): JSX.Element | null => {
  if (!show) {
    return null;
  }

  const { loading, error, data } = useQuery<{ allBooks: Book[] }>(ALL_BOOKS);

  if (loading || !data) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error: {error.message}</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a: Book) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
