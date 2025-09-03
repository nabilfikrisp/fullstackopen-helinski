import { Service } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { Token, User } from "./user.schema";
import { CreateUserInput, LoginInput } from "./user.input";
import { UserModel } from "../../models";
import ENV from "../../utils/env";

@Service()
export class UserService {
  constructor() {}

  public async createUser(input: CreateUserInput): Promise<User> {
    const { username, password, favoriteGenre } = input;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new GraphQLError("Username already exists", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      favoriteGenre,
    });
    await newUser.save();
    return newUser.toObject();
  }

  public async login(input: LoginInput): Promise<Token> {
    const { username, password } = input;

    // Find user
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new GraphQLError("Invalid username or password", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new GraphQLError("Invalid username or password", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      ENV.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { accessToken };
  }

  public async getUser(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    if (!user) {
      return null;
    }
    return user.toObject();
  }
}
