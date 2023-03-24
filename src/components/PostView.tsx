import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";

type PostWithUser = RouterOutputs["post"]["getAll"][number];

const PostView = (data: PostWithUser) => {
  const { post, author } = data;

  console.log(author)
  return(
    <div key={post.id} className="p-8 border-b border-slate-400 relative flex gap-3">
        <Image
          src={author.image}  
          alt="user photo"
          className="w-14 h-14 rounded-full m-3"
          width={60}
          height={60}
        />
        <div className="flex flex-col space-y-3 text-slate-400">
          <span className="font-bold">
            {author.firstname && author.lastname && ` ${author.firstname} ${author.lastname}`}
          </span>
          <span>
            {post.content}
          </span>
        </div>

    </div>
  )
}

export default PostView; 