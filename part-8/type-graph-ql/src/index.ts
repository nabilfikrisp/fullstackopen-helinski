import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SchemaBuilder from "@pothos/core";

import { bootstrapAuthor } from "./entities/author/bootstrap";
import { bootstrapBook } from "./entities/books/bootstrap";
import { ContextType } from "./types";

function buildSchema() {
  const builder = new SchemaBuilder<{
    Context: ContextType;
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

  return builder.toSchema();
}

export async function startServer() {
  const schema = buildSchema();
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
startServer();
