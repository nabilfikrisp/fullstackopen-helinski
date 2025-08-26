export interface Book {
  title: string;
  author: string;
  published: number;
  genres: string[];
}

export interface Author {
  name: string;
  born?: number;
  bookCount: number;
}

export interface ComponentProps {
  show: boolean;
}
