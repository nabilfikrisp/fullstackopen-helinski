import { Service } from "typedi";
import { books } from "./book.data";
import { Book } from "./book.schema";
import { BookArgs } from "./book.arg";
import { CreateBookInput } from "./book.input";
import { AuthorService } from "../author/author.service";

@Service()
export class BookService {
  constructor(private authorService: AuthorService) {}

  private generateId(): string {
    return `book-${Math.random().toString(36).substring(2, 9)}`;
  }

  public getBookCountByAuthorId(authorId: string): number {
    const filteredBooks = books.filter((book) => book.authorId === authorId);
    return filteredBooks.length;
  }

  public getBookCount(): number {
    return books.length;
  }

  public getAllBooks(args: BookArgs): Book[] {
    const { authorId, genre } = args;
    let filteredBooks = books;

    if (authorId) {
      filteredBooks = filteredBooks.filter(
        (book) => book.authorId === authorId
      );
    }

    if (genre) {
      filteredBooks = filteredBooks.filter((book) =>
        book.genres.includes(genre)
      );
    }

    return filteredBooks;
  }

  public createBook(input: CreateBookInput): Book {
    const { title, authorName, genres, published } = input;

    let author = this.authorService.getAuthorByName(authorName);

    if (!author) {
      author = this.authorService.createAuthor({ name: authorName });
    }

    const newBook: Book = {
      id: this.generateId(),
      title,
      published,
      authorId: author.id,
      genres: genres || [],
    };
    books.push(newBook);
    return newBook;
  }
}
