import { Service } from "typedi";
import { Book } from "./book.schema";
import { BookArgs } from "./book.arg";
import { CreateBookInput } from "./book.input";
import { AuthorModel, BookModel } from "../../models";
@Service()
export class BookService {
  constructor() {}

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

    let author = await AuthorModel.findOne({ name: authorName });

    if (!author) {
      author = await AuthorModel.create({ name: authorName });
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
