import type { IBlog } from "../types/blog.type";

export default function Blog({ blog }: { blog: IBlog }) {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
}
