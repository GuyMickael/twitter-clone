import { type RouterOutputs } from "~/utils/api";

type PostWithUser = RouterOutputs["post"]["getAll"][number];

const PostView = (data: PostWithUser) => {
  const { post, author } = data;
  return(
    <div key={post.id} className="p-8 border-b border-slate-400">{post.content}</div>
  )
}

export default PostView;