import { Author } from "../author/types";

export interface Book {
  id: string;
  title: string;
  published: number;
  author: Author;
  genres: string[];
}
