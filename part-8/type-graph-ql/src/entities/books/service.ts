import { books } from "./data";
import { Book } from "./types";
import { authors } from "../author/data";
import { Author } from "../author/types";

function getAll(authorId?: string, genre?: string): Book[] {
  let filteredBooks = books;
  if (authorId) {
    filteredBooks = filteredBooks.filter((book) => book.author.id === authorId);
  }
  if (genre) {
    filteredBooks = filteredBooks.filter((book) => book.genres.includes(genre));
  }
  return filteredBooks;
}

function add(
  title: string,
  published: number,
  authorName: string,
  genres: string[]
): Book {
  let author = authors.find((a) => a.name === authorName);
  if (!author) {
    author = {
      name: authorName,
      id: Date.now().toString(),
      born: undefined,
    } as Author;
    authors.push(author);
  }
  const newBook: Book = {
    id: Date.now().toString(),
    title,
    published,
    author,
    genres,
  };
  books.push(newBook);
  return newBook;
}

function count(): number {
  return books.length;
}

export const BookService = {
  getAll,
  add,
  count,
};
