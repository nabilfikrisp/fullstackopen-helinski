import { BuilderType, AuthorRefType } from "../../types";
import { BookService } from "./service";
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
        const { authorId, genre } = args;
        return BookService.getAll(authorId ?? undefined, genre ?? undefined);
      },
    }),
    booksCount: t.field({
      type: "Int",
      resolve: () => BookService.count(),
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
        const { title, published, author, genres } = args;
        return BookService.add(title, published, author, genres);
      },
    }),
  }));

  return { bookQueries, BookRef, bookMutations };
}
