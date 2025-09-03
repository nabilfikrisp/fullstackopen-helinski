import {
  Arg,
  Args,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { Book } from "./book.schema";
import { Author } from "../author/author.schema";
import { AuthorService } from "../author/author.service";
import { BookService } from "./book.service";
import { BookArgs } from "./book.arg";
import { CreateBookInput } from "./book.input";

@Service()
@Resolver(Book)
export class BookResolver {
  constructor(
    private authorService: AuthorService,
    private bookService: BookService
  ) {}

  @FieldResolver((_returns) => Author)
  async author(@Root() book: Book) {
    return this.authorService.getAuthorById(book.author.toString());
  }

  @Query((_returns) => Int)
  async bookCount() {
    return this.bookService.getBookCount();
  }

  @Query((_returns) => [Book])
  async books(@Args() args: BookArgs) {
    return this.bookService.getAllBooks(args);
  }

  @Mutation((_returns) => Book)
  async createBook(@Arg("input") input: CreateBookInput) {
    return this.bookService.createBook(input);
  }
}
