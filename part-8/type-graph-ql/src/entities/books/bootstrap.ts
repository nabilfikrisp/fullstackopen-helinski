import { BuilderType } from "../../types";
import { books } from "./data";
import { Books } from "./types";

export function bootstrapBook(builder: BuilderType, AuthorRef: any) {
  const BookRef = builder.objectRef<Books>("Book");
  BookRef.implement({
    fields: (t) => ({
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
