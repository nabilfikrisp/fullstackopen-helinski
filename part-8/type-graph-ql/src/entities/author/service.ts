import { authors } from "./data";
import { Author } from "./types";

function getAll(): Author[] {
  return authors;
}

function getFirst(): Author | undefined {
  return authors[0];
}

function create(name: string, born: number): Author {
  const newAuthor: Author = {
    id: (authors.length + 1).toString(),
    name,
    born,
  };
  authors.push(newAuthor);
  return newAuthor;
}

function edit(name: string, setBornTo: number): Author | null {
  const existingAuthor = authors.find((a) => a.name === name);
  if (!existingAuthor) return null;
  const updatedAuthor = { ...existingAuthor, born: setBornTo };
  authors[authors.indexOf(existingAuthor)] = updatedAuthor;
  return updatedAuthor;
}

function count(): number {
  return authors.length;
}

export const AuthorService = {
  getAll,
  getFirst,
  create,
  edit,
  count,
};
