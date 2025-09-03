import { Resolver, Mutation, Arg, Query, Ctx } from "type-graphql";
import { Service } from "typedi";
import { UserService } from "./user.service";
import { User, Token } from "./user.schema";
import { CreateUserInput, LoginInput } from "./user.input";
import { Context } from "../../utils/context";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUser(@Arg("userId") userId: string): Promise<User | null> {
    return await this.userService.getUser(userId);
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    return ctx.currentUser;
  }

  @Mutation(() => User)
  async createUser(@Arg("input") input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input);
  }

  @Mutation(() => Token)
  async login(@Arg("input") input: LoginInput): Promise<Token> {
    const result = await this.userService.login(input);
    return { accessToken: result.accessToken };
  }
}
