import type { IBlog } from "./blog.type";

export type IUser = {
  id: string;
  username: string;
  name: string;
  blogs: IBlog[];
};

export type IUserState = Omit<IUser, "blogs" | "id">;
export type ILoginResponse = IUserState & {
  token: string;
};
