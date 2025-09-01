import { BuilderType } from "../../types";
import { books } from "../books/data";
import { authors } from "./data";
import { Author } from "./types";

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
      resolve: () => authors[0], // Return first author for simplicity
    }),

    allAuthors: t.field({
      type: [AuthorRef],
      resolve: () => authors,
    }),

    authorCount: t.int({
      resolve: () => authors.length,
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
        const newAuthor: Author = {
          id: (authors.length + 1).toString(),
          name,
          born,
        };
        authors.push(newAuthor);
        return newAuthor;
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
        const existingAuthor = authors.find((a) => a.name === name);

        if (!existingAuthor) {
          return null;
        }
        const updatedAuthor = { ...existingAuthor, born: setBornTo };
        authors[authors.indexOf(existingAuthor)] = updatedAuthor;
        return updatedAuthor;
      },
    }),
  }));

  return { authorQueries, authorMutations, AuthorRef };
}
