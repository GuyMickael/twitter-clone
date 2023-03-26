import { SignIn, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import React from 'react';

const Auth: React.FC = () => {
  const user = useUser();

  return (
    <div className="border rounded-2xl m-2 absolute bottom-0 right-0 border-slate-400 p-4">
    {!user.isSignedIn && 
      <div className="flex justify-center h-8">
        <SignInButton />
      </div>
      } 
    {!!user.isSignedIn && <SignOutButton />}
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
</div>
  );
};

export default Auth;