import {
  Arg,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Author } from "./author.schema";
import { AuthorService } from "./author.service";
import { Service } from "typedi";
import { CreateAuthorInput, EditAuthorInput } from "./author.input";
import { BookService } from "../book/book.service";

@Service()
@Resolver((_of) => Author)
export class AuthorResolver {
  constructor(
    private authorService: AuthorService,
    private bookService: BookService
  ) {}

  //computedField
  @FieldResolver((_returns) => Int)
  async bookCount(@Root() author: Author) {
    return this.bookService.getBookCountByAuthorId(author.id);
  }

  @Query((_returns) => Author, { nullable: true })
  async author(@Arg("id", () => ID) id: string) {
    return this.authorService.getAuthorById(id);
  }

  @Query((_returns) => [Author])
  async authors() {
    return this.authorService.getAllAuthors();
  }

  @Query((_returns) => Int)
  async authorCount() {
    return this.authorService.getAuthorCount();
  }

  @Mutation((_returns) => Author)
  async createAuthor(@Arg("input") input: CreateAuthorInput) {
    return this.authorService.createAuthor(input);
  }

  @Mutation((_returns) => Author, { nullable: true })
  async editAuthor(@Arg("input") input: EditAuthorInput) {
    return this.authorService.editAuthor(input);
  }
}
