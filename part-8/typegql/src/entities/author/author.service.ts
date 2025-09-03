import { Service } from "typedi";
import { Author, AuthorModel } from "./author.schema";
import { CreateAuthorInput, EditAuthorInput } from "./author.input";

@Service()
export class AuthorService {
  public async getAuthorById(id: string): Promise<Author | null> {
    const existingAuthor = await AuthorModel.findById(id);
    return existingAuthor || null;
  }

  public async getAllAuthors(): Promise<Author[]> {
    return AuthorModel.find();
  }

  public async getAuthorCount(): Promise<number> {
    return AuthorModel.countDocuments();
  }

  public async getAuthorByName(name: string): Promise<Author | null> {
    return AuthorModel.findOne({ name });
  }

  public async createAuthor(params: CreateAuthorInput): Promise<Author> {
    const author = new AuthorModel({
      name: params.name,
      born: params.born,
    });
    await author.save();
    return author.toObject();
  }

  public async editAuthor(params: EditAuthorInput): Promise<Author | null> {
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      params.id,
      {
        name: params.name,
        born: params.born,
      },
      { new: true }
    );

    if (!updatedAuthor) {
      return null;
    }

    return updatedAuthor.toObject();
  }
}
