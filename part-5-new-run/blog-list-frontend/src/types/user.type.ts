import type { IBlog } from "./blog.type";

export type IUser = {
  id: string;
  username: string;
  name: string;
  blogs: IBlog[];
};

export type IUserState = Omit<IUser, "blogs">;
export type ILoginResponse = IUserState & {
  token: string;
};
