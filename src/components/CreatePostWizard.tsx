import { useUser } from "@clerk/nextjs";

const CreatePostWizard = () => {
  const {user} = useUser();

  if (!user) return null;

  return (
    <div className="flex border-b border-slate-400">
      <img 
        src={user.profileImageUrl} 
        alt="user photo" 
        className="w-14 h-14 rounded-full m-3"
      />
      <input  
        placeholder="Ecrivez un emoji !"
        className="bg-transparent grow "
      />
    </div>
  )
}

export default CreatePostWizard;