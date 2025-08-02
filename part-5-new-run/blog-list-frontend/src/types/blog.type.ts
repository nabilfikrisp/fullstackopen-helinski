export type IBlog = {
  id: string;
  title: string;
  author: string;
  url?: string;
  likes: number;
  createdBy: string;
};

export type IBlogCreate = Omit<IBlog, "id" | "likes">;
