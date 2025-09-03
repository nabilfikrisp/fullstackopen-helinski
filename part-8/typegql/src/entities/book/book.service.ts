import { Service } from "typedi";
import { Book, BookModel } from "./book.schema";
import { BookArgs } from "./book.arg";
import { CreateBookInput } from "./book.input";
import { AuthorService } from "../author/author.service";
@Service()
export class BookService {
  constructor(private authorService: AuthorService) {}

  public async getBookCountByAuthorId(authorId: string): Promise<number> {
    return await BookModel.find({
      author: authorId,
    }).countDocuments();
  }

  public async getBookCount(): Promise<number> {
    return await BookModel.countDocuments();
  }

  public async getAllBooks(args: BookArgs): Promise<Book[]> {
    const { authorId, genre } = args;
    const query: any = {};

    if (authorId) {
      query.author = authorId;
    }

    if (genre) {
      query.genres = { $in: [genre] };
    }

    return await BookModel.find(query).lean();
  }

  public async createBook(input: CreateBookInput): Promise<Book> {
    const { title, authorName, genres, published } = input;

    let author = await this.authorService.getAuthorByName(authorName);

    if (!author) {
      author = await this.authorService.createAuthor({ name: authorName });
    }

    const newBook = new BookModel({
      title,
      published,
      author: author._id,
      genres: genres || [],
    });
    await newBook.save();
    return newBook.toObject();
  }
}
