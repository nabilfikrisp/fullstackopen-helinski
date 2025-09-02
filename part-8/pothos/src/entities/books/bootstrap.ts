import { BuilderType, AuthorRefType } from "../../utils/types";
import { BookService } from "./service";
import { Book } from "./model";

export function bootstrapBook(builder: BuilderType, AuthorRef: AuthorRefType) {
  const BookRef = builder.objectRef<Book>("Book");
  BookRef.implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      title: t.exposeString("title"),
      published: t.exposeInt("published"),
      genres: t.exposeStringList("genres"),

      author: t.field({
        type: AuthorRef,
        resolve: async (book) => {
          const author = await BookService.getAuthor(book.author.toString());
          return author;
        },
      }),
    }),
  });

  const bookQueries = builder.queryFields((t) => ({
    allBooks: t.field({
      type: [BookRef],
      args: { authorId: t.arg.string(), genre: t.arg.string() },
      resolve: async (_, args) => {
        const { authorId, genre } = args;
        const books = await BookService.getAll(authorId, genre);
        return books;
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
