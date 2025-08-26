import { useState, FormEvent, ChangeEvent } from "react";
import { ComponentProps } from "../types";
import { useMutation } from "@apollo/client/react";
import { ADD_BOOK } from "../queries/mutations";
import { ALL_AUTHORS, ALL_BOOKS } from "../queries/queries";

const NewBook = ({ show }: ComponentProps): JSX.Element | null => {
  const [mutate, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [ALL_BOOKS, ALL_AUTHORS],
  });
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [published, setPublished] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    console.log("add book...");

    await mutate({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = (): void => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              setTitle(target.value)
            }
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              setAuthor(target.value)
            }
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              setPublished(target.value)
            }
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              setGenre(target.value)
            }
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
