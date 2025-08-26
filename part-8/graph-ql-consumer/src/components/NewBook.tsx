import { useState, FormEvent, ChangeEvent } from "react";
import { ComponentProps } from "../types";

const NewBook = ({ show }: ComponentProps): JSX.Element | null => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [published, setPublished] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);

  if (!show) {
    return null;
  }

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    console.log("add book...");

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
