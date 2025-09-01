import { Books } from "./types";

export const books: Books[] = [
  {
    title: "Book 1",
    published: 2020,
    author: {
      id: "1",
      name: "James",
      born: 2000,
    },
    genres: ["Fiction", "Adventure"],
  },
  {
    title: "Book 2",
    published: 2021,
    author: {
      id: "2",
      name: "Jane",
      born: 2001,
    },
    genres: ["Non-Fiction", "Biography"],
  },
];
