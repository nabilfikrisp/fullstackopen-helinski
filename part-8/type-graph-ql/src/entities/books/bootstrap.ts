import { BuilderType, AuthorRefType } from "../../types";
import { books } from "./data";
import { Book } from "./types";
import { authors } from "../author/data";

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
    booksCount: t.field({
      type: "Int",
      resolve: () => books.length,
    }),
  }));

  const bookMutations = builder.mutationFields((t) => ({
    addBook: t.field({
      type: BookRef,
      args: {
        title: t.arg.string({ required: true }),
        published: t.arg.int({ required: true }),
        author: t.arg.string({ required: true }),
        genres: t.arg.stringList({ required: true }),
      },
      resolve: (_, args) => {
        const { author: authorName } = args;
        const existingAuthor = authors.find((a) => a.name === authorName);
        const author =
          existingAuthor ||
          ({ name: authorName, id: Date.now().toString() } as any);
        if (!existingAuthor) {
          authors.push(author);
        }
        const newBook = { ...args, id: Date.now().toString(), author };
        books.push(newBook);
        return newBook;
      },
    }),
  }));

  return { bookQueries, BookRef, bookMutations };
}
