import { books } from "./data";

type GetAllBooksParams = {
  authorId?: string;
  genre?: string;
};
function getAllBooks(args: GetAllBooksParams) {
  const { authorId, genre } = args;

  let filteredBooks = books;
  if (authorId) {
    filteredBooks = filteredBooks.filter((book) => book.author.id === authorId);
  }
  if (genre) {
    filteredBooks = filteredBooks.filter((book) => book.genres.includes(genre));
  }

  return filteredBooks;
}

export const bookService = {
  getAllBooks,
};
