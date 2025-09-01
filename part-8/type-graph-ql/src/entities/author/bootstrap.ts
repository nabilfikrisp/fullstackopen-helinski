import { BuilderType } from "../../utils/types";
import { GraphQLError } from "graphql";
import { Author } from "./model";
import { AuthorService } from "./service";
import { BookService } from "../books/service";

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
        resolve: async (author) => {
          const books = await BookService.getAll(author.id);
          return books.length;
        },
      }),
    }),
  });

  const authorQueries = builder.queryFields((t) => ({
    author: t.field({
      type: AuthorRef,
      resolve: async () => {
        return await AuthorService.getFirst();
      },
    }),

    allAuthors: t.field({
      type: [AuthorRef],
      resolve: async () => {
        return await AuthorService.getAll();
      },
    }),

    authorCount: t.int({
      resolve: async () => {
        return await AuthorService.count();
      },
    }),
  }));

  const authorMutations = builder.mutationFields((t) => ({
    createAuthor: t.field({
      type: AuthorRef,
      args: {
        name: t.arg.string({ required: true }),
        born: t.arg.int({ required: true }),
      },
      resolve: async (_, args) => {
        const { born, name } = args;
        try {
          return await AuthorService.create(name, born);
        } catch (error) {
          throw new GraphQLError("Author name must be unique", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
      },
    }),
    editAuthor: t.field({
      type: AuthorRef,
      args: {
        name: t.arg.string({ required: true }),
        setBornTo: t.arg.int({ required: true }),
      },
      resolve: async (_, args) => {
        const { name, setBornTo } = args;
        const updatedAuthor = await AuthorService.edit(name, setBornTo);
        if (!updatedAuthor) {
          throw new GraphQLError("Author not found", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
        return updatedAuthor;
      },
    }),
  }));

  return { authorQueries, authorMutations, AuthorRef };
}
