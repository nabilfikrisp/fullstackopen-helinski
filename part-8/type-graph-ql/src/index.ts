import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SchemaBuilder from "@pothos/core";

interface Author {
  id: string;
  name: string;
  born: string;
}

interface Books {
  title: string;
  published: number;
  author: Author;
  genres: string[];
}

export async function startServer() {
  const builder = new SchemaBuilder({});

  const AuthorRef = builder.objectRef<Author>("Author");
  AuthorRef.implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      born: t.exposeString("born"),
    }),
  });

  builder.queryType({
    fields: (t) => ({
      hello: t.string({
        resolve: () => "hello, world!",
      }),
      author: t.field({
        type: AuthorRef,
        resolve: () => ({
          id: "1",
          name: "James",
          born: "2000",
        }),
      }),
      authors: t.field({
        type: [AuthorRef],
        resolve: () => [
          {
            id: "1",
            name: "James",
            born: "2000",
          },
          {
            id: "2",
            name: "Jane",
            born: "2001",
          },
        ],
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      createAuthor: t.field({
        type: AuthorRef,
        args: {
          name: t.arg.string({ required: true }),
          born: t.arg.string({ required: true }),
        },
        resolve: (_, args) => {
          const { born, name } = args;
          return {
            id: "3",
            name,
            born,
          };
        },
      }),
    }),
  });

  const BookRef = builder.objectRef<Books>("Book");
  BookRef.implement({
    fields: (t) => ({
      title: t.exposeString("title"),
      published: t.exposeInt("published"),
      author: t.expose("author", { type: AuthorRef }),
      genres: t.exposeStringList("genres"),
    }),
  });

  builder.queryType({
    fields: (t) => ({
      books: t.field({
        type: [BookRef],
        resolve: () => [
          {
            title: "Book 1",
            published: 2020,
            author: {
              id: "1",
              name: "James",
              born: "2000",
            },
            genres: ["Fiction", "Adventure"],
          },
          {
            title: "Book 2",
            published: 2021,
            author: {
              id: "2",
              name: "Jane",
              born: "2001",
            },
            genres: ["Non-Fiction", "Biography"],
          },
        ],
      }),
    }),
  });

  const server = new ApolloServer({ schema: builder.toSchema() });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
