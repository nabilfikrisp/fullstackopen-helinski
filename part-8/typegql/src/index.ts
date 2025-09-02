import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./entities/hello/hello.resolver";
import { AuthorResolver } from "./entities/author/author.resolver";
import { Container } from "typedi";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandler";
import path from "path";
import { BookResolver } from "./entities/book/book.resolver";
import ENV from "./utils/env";
import { connectToDatabase } from "./utils/db";

async function bootstrap() {
  Container.set("ENV", ENV);

  await connectToDatabase();

  const schema = await buildSchema({
    resolvers: [HelloResolver, AuthorResolver, BookResolver],
    container: Container,
    validate: true,
    globalMiddlewares: [ErrorHandlerMiddleware],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: ENV.PORT },
  });
  console.log(`🚀 Server ready at ${url}`);
}

bootstrap();
