import { Author } from "../author/types";

export interface Books {
  title: string;
  published: number;
  author: Author;
  genres: string[];
}
