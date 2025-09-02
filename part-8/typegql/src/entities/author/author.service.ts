import { Service } from "typedi";
import { authors } from "./author.data";
import { Author } from "./author.schema";
import { CreateAuthorInput, EditAuthorInput } from "./author.input";

@Service()
export class AuthorService {
  private generateId(): string {
    return `author-${Math.random().toString(36).substring(2, 9)}`;
  }

  public getAuthorById(id: string): Author | null {
    return authors.find((author) => author.id === id) || null;
  }

  public getAllAuthors(): Author[] {
    return authors;
  }

  public getAuthorCount(): number {
    return authors.length;
  }

  public getAuthorByName(name: string): Author | null {
    return authors.find((author) => author.name === name) || null;
  }

  public createAuthor(params: CreateAuthorInput): Author {
    const author: Author = {
      id: this.generateId(),
      name: params.name,
      born: params.born,
    };
    authors.push(author);
    return author;
  }

  public editAuthor(params: EditAuthorInput): Author | null {
    const author = this.getAuthorById(params.id);
    if (!author) {
      return null;
    }

    if (params.name) {
      author.name = params.name;
    }
    if (params.born) {
      author.born = params.born;
    }

    return author;
  }
}
