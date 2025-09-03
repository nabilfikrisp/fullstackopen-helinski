import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AuthorResolver } from "./entities/author/author.resolver";
import { Container } from "typedi";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandler";
import path from "path";
import { BookResolver } from "./entities/book/book.resolver";
import ENV from "./utils/env";
import { connectToDatabase } from "./utils/db";
import { UserResolver } from "./entities/user/user.resolver";
import { Context, getCurrentUser } from "./utils/context";

async function bootstrap() {
  Container.set("ENV", ENV);

  await connectToDatabase();

  const schema = await buildSchema({
    resolvers: [AuthorResolver, BookResolver, UserResolver],
    container: Container,
    validate: true,
    globalMiddlewares: [ErrorHandlerMiddleware],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: ENV.PORT },
    context: async ({ req }): Promise<Context> => {
      const currentUser = await getCurrentUser(req.headers.authorization);
      return { currentUser };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
}

bootstrap();
