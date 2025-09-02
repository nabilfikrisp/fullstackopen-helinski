import { Author, AuthorModel } from "./model";

export class AuthorService {
  static async getAll(): Promise<Author[]> {
    const authors = await AuthorModel.find().lean<Author[]>().exec();
    return authors;
  }

  static async getFirst(): Promise<Author | undefined> {
    const author = await AuthorModel.findOne().lean<Author>().exec();
    return author ?? undefined;
  }

  static async create(name: string, born: number): Promise<Author> {
    const existingAuthor = await AuthorModel.findOne({ name });
    if (existingAuthor) {
      throw new Error("Author name must be unique");
    }
    const newAuthor = new AuthorModel({ name, born });
    const savedAuthor = await newAuthor.save();
    return { ...savedAuthor.toObject(), id: savedAuthor._id.toString() };
  }

  static async edit(name: string, setBornTo: number): Promise<Author | null> {
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      { name },
      { born: setBornTo },
      { new: true, runValidators: true }
    ).lean<Author>();
    return updatedAuthor ?? null;
  }

  static async count(): Promise<number> {
    const count = await AuthorModel.countDocuments().exec();
    return count;
  }
}
