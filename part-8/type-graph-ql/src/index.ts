import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { bootstrapAuthor } from "./entities/author/bootstrap";
import { bootstrapBook } from "./entities/books/bootstrap";
import { ContextType } from "./utils/types";
import { AuthorModel } from "./entities/author/model";
import { BookModel } from "./entities/books/model";
import { connectToDatabase } from "./utils/db";

import SchemaBuilder from "@pothos/core";
import ENV from "./utils/ENV";

function buildSchema() {
  const builder = new SchemaBuilder<{
    Context: ContextType;
  }>({});

  builder.queryType();
  builder.mutationType();

  const { AuthorRef } = bootstrapAuthor(builder);
  bootstrapBook(builder, AuthorRef);

  return builder.toSchema();
}

export async function startServer() {
  await connectToDatabase();
  const schema = buildSchema();
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: ENV.PORT },
    context: async () => ({
      db: {
        Author: AuthorModel,
        Book: BookModel,
      },
    }),
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
