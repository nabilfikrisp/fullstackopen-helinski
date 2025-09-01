import { BuilderType, AuthorRefType } from "../../types";
import { books } from "./data";
import { Book } from "./types";

export function bootstrapBook(builder: BuilderType, AuthorRef: AuthorRefType) {
  const BookRef = builder.objectRef<Book>("Book");
  BookRef.implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      title: t.exposeString("title"),
      published: t.exposeInt("published"),
      author: t.expose("author", { type: AuthorRef }),
      genres: t.exposeStringList("genres"),
    }),
  });

  const bookQueries = builder.queryFields((t) => ({
    allBooks: t.field({
      type: [BookRef],
      args: { authorId: t.arg.string(), genre: t.arg.string() },
      resolve: (_, args) => {
        let filteredBooks = books;
        const { authorId, genre } = args;
        if (authorId) {
          filteredBooks = filteredBooks.filter(
            (book) => book.author.id === authorId
          );
        }
        if (genre) {
          filteredBooks = filteredBooks.filter((book) =>
            book.genres.includes(genre)
          );
        }

        return filteredBooks;
      },
    }),
  }));

  return { bookQueries, BookRef };
}
