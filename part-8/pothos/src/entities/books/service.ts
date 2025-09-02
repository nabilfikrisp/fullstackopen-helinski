import { Author, AuthorModel } from "../author/model";
import { Book, BookModel } from "./model";

async function getAuthor(authorId: string): Promise<Author | undefined> {
  const author = await AuthorModel.findById(authorId).lean<Author>().exec();
  return author ?? undefined;
}

async function getAll(
  authorId?: string | null,
  genre?: string | null
): Promise<Book[]> {
  let query: any = {};
  if (authorId) {
    query.author = authorId;
  }
  if (genre) {
    query.genres = { $in: [genre] };
  }
  const books = await BookModel.find(query).lean<Book[]>().exec();
  return books;
}

async function count(): Promise<number> {
  const count = await BookModel.countDocuments().exec();
  return count;
}

async function add(
  title: string,
  published: number,
  author: string,
  genres: string[]
): Promise<Book> {
  const book = new BookModel({ title, published, author, genres });
  const savedBook = await book.save();
  return { ...savedBook.toObject(), id: savedBook._id.toString() };
}

export const BookService = {
  getAuthor,
  getAll,
  add,
  count,
};
