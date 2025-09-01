import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SchemaBuilder from "@pothos/core";

import { bootstrapAuthor } from "./entities/author/bootstrap";
import { bootstrapBook } from "./entities/books/bootstrap";

export async function startServer() {
  const builder = new SchemaBuilder<{
    Context: {};
  }>({});

  builder.queryType({
    fields: (t) => ({
      hello: t.string({
        resolve: () => "hello, world!",
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      helloMutation: t.string({
        resolve: () => "hello, world!",
      }),
    }),
  });

  const { AuthorRef } = bootstrapAuthor(builder);
  bootstrapBook(builder, AuthorRef);

  const server = new ApolloServer({ schema: builder.toSchema() });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
