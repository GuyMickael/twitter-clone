import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api, type RouterOutputs } from "~/utils/api";

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

type PostWithUser = RouterOutputs["post"]["getAll"][number];

const PostView = (data: PostWithUser) => {
  const { post, author } = data;
  return(
    <div key={post.id} className="p-8 border-b border-slate-400">{post.content}</div>
  )
}

const Home: NextPage = () => {
  const user = useUser();
  const {data, isLoading} =  api.post.getAll.useQuery();

  if (isLoading) return <div>Loading ...</div>

  if (!data) return <div>Woops no data</div>

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main className="flex justify-center h-screen">
      <div className="border rounded-2xl m-2 absolute right-0 border-slate-400 p-4">
            {!user.isSignedIn && 
              <div className="flex justify-center h-8">
                <SignInButton />
              </div>
              } 
            {!!user.isSignedIn && <SignOutButton />}
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
      <div className="w-full h-full md:max-w-2xl border-x border-slate-400">
        <CreatePostWizard />
        
        <div className="flex flex-col">
          {data?.map((fullPost) => (
            <PostView {...fullPost} key={fullPost.post.id}/>
            ))}
        </div>  
      </div>
    </main>
  </>
)};

export default Home;
