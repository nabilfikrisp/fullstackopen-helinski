import { BuilderType } from "../../types";
import { AuthorService } from "./service";
import { Author } from "./types";
import { books } from "../books/data";

export function bootstrapAuthor(builder: BuilderType) {
  const AuthorRef = builder.objectRef<Author>("Author");
  AuthorRef.implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      born: t.exposeInt("born"),

      //computed filed
      bookCount: t.field({
        type: "Int",
        resolve: (author) => {
          return books.filter((book) => book.author.id === author.id).length;
        },
      }),
    }),
  });

  const authorQueries = builder.queryFields((t) => ({
    author: t.field({
      type: AuthorRef,
      resolve: () => AuthorService.getFirst(),
    }),

    allAuthors: t.field({
      type: [AuthorRef],
      resolve: () => AuthorService.getAll(),
    }),

    authorCount: t.int({
      resolve: () => AuthorService.count(),
    }),
  }));

  const authorMutations = builder.mutationFields((t) => ({
    createAuthor: t.field({
      type: AuthorRef,
      args: {
        name: t.arg.string({ required: true }),
        born: t.arg.int({ required: true }),
      },
      resolve: (_, args) => {
        const { born, name } = args;
        return AuthorService.create(name, born);
      },
    }),
    editAuthor: t.field({
      type: AuthorRef,
      args: {
        name: t.arg.string({ required: true }),
        setBornTo: t.arg.int({ required: true }),
      },
      resolve: (_, args) => {
        const { name, setBornTo } = args;
        return AuthorService.edit(name, setBornTo);
      },
    }),
  }));

  return { authorQueries, authorMutations, AuthorRef };
}
