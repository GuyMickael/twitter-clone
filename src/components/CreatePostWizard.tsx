import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const {user, isLoaded: userLoaded} = useUser();

  const [inputValue, setInputValue] = useState<string>("");
  const ctx = api.useContext();

  const {mutate: createPost, isLoading: isPosting} = api.post.create.useMutation({
    onSuccess: () => {
      setInputValue("");
      void ctx.post.getAll.invalidate();
    }
  });

  if (!userLoaded) return (
    <div className="flex border-b border-slate-400">
    <Image 
      src={""} 
      width={60}
      height={60}
      alt="user photo" 
      className="w-14 h-14 rounded-full m-3"
    />
    <input  
      placeholder="Ecrivez un emoji !"
      className="bg-transparent grow "
    />
  </div>
  );

  return (
    <div className="flex border-b border-slate-400">
      <Image 
        src={user?.profileImageUrl || ""} 
        width={60}
        height={60}
        alt="user photo" 
        className="w-14 h-14 rounded-full m-3"
      />
      <input  
        placeholder="Ecrivez un emoji !"
        className="bg-transparent grow "
        type={"text"}
        value={inputValue}
        disabled={isPosting}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          createPost({content: inputValue});
        }}
      >
        Post
      </button>
    </div>
  )
}

export default CreatePostWizard;